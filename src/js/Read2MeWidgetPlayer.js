class Read2MeWidgetPlayer {
    constructor(widgetBlueprint, url, title = null, thumbnail = null, autoplay = false, playerId = 0, theme = null, width = null) {
        // sliders
        this.isScrubberBeingDragged = false;
        this.scrubber = null;
        this.speakingRate = null;

        // arguments
        this.widgetBlueprint = widgetBlueprint;
        this.url = url;
        this.title = title;
        this.thumbnail = thumbnail;
        this.autoplay = autoplay;
        this.playerId = playerId;
        this.theme = theme;
        this.width = width;

        this.player = Read2MeHelpers.getWidgetTemplate();
        this.playbackContainer = this.player.querySelector('.read2me-widget-player-playback');
        this.loader = this.player.querySelector('.read2me-widget-loader');
        this.titleContainer= this.player.querySelector('.read2me-widget-player-title');
        this.titleTextContainer = this.titleContainer.querySelector('span');
        widgetBlueprint.parentNode.replaceChild(this.player, this.widgetBlueprint);

        // UI playback controllers
        this.play = this.player.querySelector('.read2me-widget-player-playback-play');
        this.pause = this.player.querySelector('.read2me-widget-player-playback-pause');
        this.replay = this.player.querySelector('.read2me-widget-player-playback-replay');

        // set the player up
        this.setTitle();
        this.setThumbnail();
        this.setTheme();
        this.setWidth();
        this.player.classList.remove('read2me-template');
        this.instantiateSliders();
    }

    finishInitialisation(audioController, apiResponse) {
        if (audioController instanceof Read2MeAudioController === false)
            throw 'Invalid argument for Read2MeWidgetPlayer.finishInitialisation(); must be an instance of Read2MeAudioController';

        this.audioController = audioController;
        this.apiResponse = apiResponse;
        this.configureSliders();
        this.handleAutoplay();
        this.handlePlayback();
        this.handleQuickControls();
        this.handleScrubber();
        this.handleSpeakingRateChange();
        this.hideLoader();
        this.removePlaybackBufferingStyles();
        this.setMarqueeForTitle();
    }

    instantiateSliders() {
        // make ID and data-slider-id attributes unique for scrubber and speaking rate inputs
        // scrubber's node id: #read2me-widget-scrubber-player
        // speaking rate's node id: #read2me-widget-player-speaking-rate
        let scrubberId = 'read2me-widget-scrubber-player';
        let speakingRateId = 'read2me-widget-player-speaking-rate';

        let newScrubberId = scrubberId + '-' + this.playerId;
        let newSpeakingRateId = speakingRateId + '-' + this.playerId;

        // append playerId to their IDs to make them unique
        let scrubber = this.player.querySelector('#' + scrubberId);
        scrubber.setAttribute('id', newScrubberId);
        scrubber.setAttribute('data-slider-id', newScrubberId);

        let speakingRate = this.player.querySelector('#' + speakingRateId);
        speakingRate.setAttribute('id', newSpeakingRateId);
        speakingRate.setAttribute('data-slider-id', newSpeakingRateId);

        this.scrubber = new Slider('#' + newScrubberId, {
            tooltip_position: 'bottom',
            formatter: function (seconds) {
                let currentTimeArray = Read2MeHelpers.secondsToHumanReadableArray(seconds);

                return Read2MeHelpers.secondsMinutesHoursToHumanReadable(
                    currentTimeArray[0], currentTimeArray[1], currentTimeArray[2]
                );
            },
        });

        this.speakingRate = new Slider('#' + newSpeakingRateId, {
            tooltip_position: 'bottom',

            formatter: function (value) {
                return value + 'x';
            }
        });
    }

    configureSliders() {
        this.scrubber.setAttribute('max', this.apiResponse.audio_length_seconds);
        this.scrubber.enable();
    }

    setTitle() {
        let pageTitle = Read2MeHelpers.getPageTitle();

        if (this.title !== null)
            this.titleTextContainer.textContent = this.title;
        else if (pageTitle !== null)
            this.titleTextContainer.textContent = pageTitle;
    }

    setMarqueeForTitle() {
        if (this.titleTextContainer.offsetWidth > this.titleContainer.offsetWidth)
            this.titleTextContainer.classList.add('read2me-marquee');
    }

    setThumbnail() {
        let container = this.player.querySelector('.read2me-widget-player-thumbnail');
        let ogImage = Read2MeHelpers.getOgImageUrl();
        let defaultThumbnail = 'https://d22fip447qchhd.cloudfront.net/api/widget/static/images/default-thumbnail.png';

        if (this.thumbnail !== null)
            container.setAttribute('src', this.thumbnail);
        else if (ogImage !== null)
            container.setAttribute('src', ogImage);
        else
            container.setAttribute('src', defaultThumbnail);
    }

    handleAutoplay() {
        if (!this.autoplay)
            return;

        this.audioController.audio.addEventListener('canplay', () => {
            this.audioController.audio.play();
        });
    }

    setTheme() {
        switch (this.theme) {
            case 'blue':
                this.player.classList.add('preset-blue');
                break;
            case 'white':
                this.player.classList.add('preset-white');
                break;
        }
    }

    setWidth() {
        if (this.width === null)
            return;

        this.player.style.width = this.width;
    }

    handlePlayback() {
        this.audioController.audio.addEventListener('playing', () => {
            this.hideLoader();
        });

        this.playbackContainer.addEventListener('click', () => {
            if (this.isPlayButtonShown()) {
                this.audioController.play();
                this.displayLoader();
                this.displayPauseButton();
            } else if (this.isPauseButtonShown()) {
                this.audioController.pause();
                this.displayPlayButton();
            } else {
                this.audioController.replay();
                this.displayPauseButton();
            }
        });

        this.audioController.audio.addEventListener('ended', () => {
            this.displayReplayButton();
        });

        this.audioController.audio.addEventListener('stalled', () => {
            this.displayLoader();
        });
    }

    isPlayButtonShown() {
        return !this.play.classList.contains('hidden');
    }

    displayPlayButton() {
        this.play.classList.remove('hidden');
        this.pause.classList.add('hidden');
        this.replay.classList.add('hidden');
    }

    isPauseButtonShown() {
        return !this.pause.classList.contains('hidden');
    }

    displayPauseButton() {
        this.play.classList.add('hidden');
        this.pause.classList.remove('hidden');
        this.replay.classList.add('hidden');
    }

    isReplayButtonShown() {
        return !this.replay.classList.contains('hidden');
    }

    displayReplayButton() {
        this.play.classList.add('hidden');
        this.pause.classList.add('hidden');
        this.replay.classList.remove('hidden');
    }

    handleQuickControls() {
        let rewind = this.player.querySelector('.read2me-widget-rewind');
        let forward = this.player.querySelector('.read2me-widget-forward');

        rewind.addEventListener('click', () => {
            this.audioController.rewindForXSeconds(10);

            if (this.isReplayButtonShown())
                this.displayPlayButton();
        });

        forward.addEventListener('click', () => {
            this.audioController.forwardForXSeconds(10);
        });
    }

    handleScrubber() {
        this.scrubber.on('slideStart', () => {
            this.isScrubberBeingDragged = true;
        });

        this.scrubber.on('slideStop', (newCurrentTime) => {
            this.isScrubberBeingDragged = false;
            this.audioController.setCurrentTime(newCurrentTime);

            if (this.isReplayButtonShown() && newCurrentTime !== this.audioController.getDuration())
                this.displayPlayButton();
        });

        this.audioController.audio.addEventListener('timeupdate', () => {
            if (this.isScrubberBeingDragged)
                return false;

            this.scrubber.setValue(Math.round(this.audioController.getCurrentTime()));
        });
    }

    handleSpeakingRateChange() {
        this.speakingRate.on('change', (values) => {
            this.audioController.setPlaySpeed(values.newValue);
        });
    }

    displayLoader() {
        this.loader.classList.remove('hidden');
    }

    hideLoader() {
        this.loader.classList.add('hidden');
    }

    removePlaybackBufferingStyles() {
        this.playbackContainer.classList.remove('read2me-playback-buffering');
    }
}