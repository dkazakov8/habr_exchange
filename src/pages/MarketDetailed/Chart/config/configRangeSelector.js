import { messages } from '../messages';

export default {
  inputEnabled: false,
  selected: 1,
  height: 24,
  labelStyle: {
    display: 'none',
  },
  buttonPosition: {
    align: 'right',
  },
  buttonSpacing: 0,
  buttons: [
    {
      type: 'month',
      text: messages.month,
      count: 1,
      dataGrouping: {
        forced: true,
        units: [['day', [1]]],
      },
    },
    {
      type: 'month',
      text: messages.month,
      count: 3,
      dataGrouping: {
        forced: true,
        units: [['day', [1]]],
      },
    },
    {
      type: 'month',
      text: messages.month,
      count: 6,
      dataGrouping: {
        forced: true,
        units: [['week', [1]]],
      },
    },
  ],
};
