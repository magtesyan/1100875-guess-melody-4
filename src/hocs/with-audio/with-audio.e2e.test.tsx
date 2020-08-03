import * as React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio";

configure({adapter: new Adapter()});

const Player = (props: PlayerProps) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

interface PlayerProps {
  onPlayButtonClick: () => void;
  children: React.ReactNode;
};

it(`Checks that HOC's callback turn on audio (play)`, () => {
  const PlayerWrapped = withAudio(Player);
  let isPlaying = true;
  const onPlayButtonClick = jest.fn(() => {
    isPlaying = !isPlaying;
    wrapper.setProps({isPlaying});
  });
  const wrapper = mount(<PlayerWrapped
    isPlaying={isPlaying}
    onPlayButtonClick={onPlayButtonClick}
    src=""
  />);

  window.HTMLMediaElement.prototype.pause = () => {};

  const {audioRef} = wrapper.instance();

  jest.spyOn(audioRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(audioRef.current.pause).toHaveBeenCalledTimes(1);
  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  expect(wrapper.props().isPlaying).toEqual(false);
});

it(`Checks that HOC's callback turn off audio (pause)`, () => {
  const PlayerWrapped = withAudio(Player);
  let isPlaying = false;
  const onPlayButtonClick = jest.fn(() => {
    isPlaying = !isPlaying;
    wrapper.setProps({isPlaying});
  });
  const wrapper = mount(<PlayerWrapped
    isPlaying={isPlaying}
    onPlayButtonClick={onPlayButtonClick }
    src=""
  />);

  window.HTMLMediaElement.prototype.play = jest.fn();

  const {audioRef} = wrapper.instance();

  jest.spyOn(audioRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`button`).simulate(`click`);

  expect(audioRef.current.play).toHaveBeenCalledTimes(1);
  expect(onPlayButtonClick).toHaveBeenCalledTimes(1);
  expect(wrapper.props().isPlaying).toEqual(true);
});
