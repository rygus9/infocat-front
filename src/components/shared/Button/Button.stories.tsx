import Button from '.';

export default {
  title: 'components/shared/Button',
  component: Button,
  argTypes: {
    size: { defaultValue: 'px-3 py-1.5', control: 'text' },
    buttonStyle: {
      defaultValue: 'border',
      options: ['border', 'fill'],
      control: { type: 'radio' },
    },
    color: {
      defaultValue: 'purple',
      options: ['purple', 'gray'],
      control: { type: 'radio' },
    },
    type: {
      defaultValue: 'button',
      options: ['button', 'submit'],
      control: { type: 'radio' },
    },
  },
};

export const Default = (args: any) => <Button {...args}>디폴트 버틍</Button>;
