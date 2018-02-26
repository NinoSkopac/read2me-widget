import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import SVGInline from 'react-svg-inline';

class RootWidget extends React.Component {
  static propTypes = {
    voice: PropTypes.string.isRequired
  };
  render() {
    return (
      <div className="read2me-widget-wrapper read2me-template">
        <div className="read2me-widget-player">
          <img src="" className="read2me-widget-player-thumbnail" />
          <div className="read2me-widget-player-title">
            <span>Listen to this article</span>
          </div>
          <div
            className="read2me-widget-player-quick-controls"
            title="Rewind and forward by 10 seconds"
          >
            {/* inlining styles into the SVG fixes a FF bug where the image would appear fullscreen for a moment */}
            <SVGInline
              svg={`
                <svg style="width: 16px; height: 16px;" class="read2me-widget-rewind" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                      <path d="M0 0h24v24H0V0z" id="a"></path>
                  </defs>
                  <clipPath id="b">
                      <use overflow="visible" xlink:href="#a"></use>
                  </clipPath>
                  <path clip-path="url(#b)"
                        d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.1 11H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1c.2.1.3.2.5.3s.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path>
                </svg>
              `}
            />
            <SVGInline
              svg={`<svg style="width: 16px; height: 16px;" class="read2me-widget-forward" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            >
                <defs>
                    <path d="M24 24H0V0h24v24z" id="a"></path>
                </defs>
                <clipPath id="b">
                    <use overflow="visible" xlink:href="#a"></use>
                </clipPath>
                <path clip-path="url(#b)"
                      d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.8 3H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path>
            </svg>`}
            />
          </div>
          <div className="read2me-widget-player-playback read2me-playback-buffering">
            {/* inlining styles into the SVG fixes a FF bug where the image would appear fullscreen for a moment */}
            <SVGInline
              svg={`<svg style="width: 22px; height: 22px;"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" class="read2me-widget-player-playback-play">
                <path d="M10,5.251v39.497L43.572,25L10,5.251z"></path>
            </svg>`}
            />
            <SVGInline
              svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 class="read2me-widget-player-playback-pause hidden">
                <g>
                    <g>
                        <rect x="16" width="8" height="24"></rect>
                        <rect width="8" height="24"></rect>
                    </g>
                </g>
            </svg>`}
            />
            <SVGInline
              svg={`<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"
                 class="read2me-widget-player-playback-replay hidden">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path>
            </svg>`}
            />
          </div>
          <div className="read2me-widget-player-sliders-container read2me-widget-player-scrubber-container">
            <input
              className="read2me-widget-player-scrubber"
              id="read2me-widget-scrubber-player"
              data-slider-id="read2me-widget-scrubber-player"
              type="text"
              data-slider-min="0"
              data-slider-max="10"
              data-slider-step="1"
              data-slider-value="0"
              data-slider-enabled="false"
            />
          </div>
          <div className="read2me-widget-player-sliders-container read2me-widget-player-speaking-rate-container">
            {/* inlining styles into the SVG fixes a FF bug where the image would appear fullscreen for a moment */}
            <SVGInline
              svg={`<svg style="width: 20px;"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="read2me-widget-speaking-rate">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"></path>
            </svg>`}
            />
            <input
              className="read2me-widget-player-speaking-rate"
              id="read2me-widget-player-speaking-rate"
              data-slider-id="read2me-widget-player-speaking-rate"
              type="text"
              data-slider-min="0.5"
              data-slider-max="1.5"
              data-slider-step="0.25"
              data-slider-value="1"
            />
          </div>
          <div className="read2me-credits hidden">
            <a href="https://read2me.online" target="_blank">
              powered by read2me.online
            </a>
          </div>
          <div className="read2me-widget-loader" />
        </div>
      </div>
    );
  }
}

export default RootWidget;