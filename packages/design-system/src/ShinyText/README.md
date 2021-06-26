# ShinyText

Shows a text with a shiny rainbow effect

## Usage

```jsx
<ShinyText text="lorem ipsum" />
```

## Props

| Name     | Type    | Required | Default | Description                 |
| -------- | ------- | -------- | ------- | --------------------------- | ------------------------ |
| text     | string  | yes      |         | text to put inside the chip |
| hover    | boolean |          |         | Shine only on hover         |
| animated | boolean |          |         |                             | The gradient is animated |
| strong   | boolean |          |         |                             | The text is bolded       |

## Styling

The component can be customized using the CSS variables:

```
--shiny-text-animation: shine 3s linear infinite;
--shiny-text-gradient: linear-gradient(
to right,
#9048fd 20%,
#4bcbc9 40%,
#4bcbc9 70%,
#9048fd 90%
);
```
