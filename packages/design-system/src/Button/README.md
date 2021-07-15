# Button

This component implements a button.

## Usage

```jsx
<Button text="Click me" variant="primary" onClick={clickHandler} />
```

## Props

| Name      | Type                                      | Required | Default | Description                                    |
| --------- | ----------------------------------------- | -------- | ------- | ---------------------------------------------- |
| onClick   | func                                      | required |         | onClick handler                                |
| className | string                                    |          |         | names of custom css classes separated by space |
| text      | string                                    | required |         | text of the button                             |
| variant   | string                                    |          | default | variant                                        |
| color     | One of ['primary', 'secondary'] or string |          | default | color of the button                            |
| size      | One of ['small', 'medium', 'large']       |          | medium  | size of the button                             |
| fullWidth | boolean                                   |          | false   | full width button if set to true               |
