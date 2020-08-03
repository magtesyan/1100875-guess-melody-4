import * as React from 'react';
import Player from "../../components/audio-player/audio-player";
import withAudio from "../with-audio/with-audio";
import {Subtract} from "utility-types";

interface State {
  activePlayerId: number;
}

interface InjectingProps {
  renderPlayer: (src: string, id: number) => React.ReactNode;
}

const AudioPlayer = withAudio(Player);

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: -1,
      };
    }

    render() {
      const {activePlayerId} = this.state;
      return <Component
        {...this.props}
        renderPlayer={(src, id) => {
          const handlePlayButtonClick = () => this.setState({
            activePlayerId: activePlayerId === id ? -1 : id
          });
          return (
            <AudioPlayer
              src={src}
              isPlaying={id === activePlayerId}
              onPlayButtonClick={handlePlayButtonClick}
            />
          );
        }}
      />;
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
