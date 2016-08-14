import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import 'react-lumberjack'

setAddon(infoAddon);

function loadStories() {
  require('../src/stories/');
}

configure(loadStories, module);
