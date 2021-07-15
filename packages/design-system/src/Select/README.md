# Select

This component implements a fancy select, using react-select library.

## Usage

```jsx
<Select options={options} onSelect={() => foo()} />
```

## Props

| Name               | Type     | Required | Default | Description                                                        |
| ------------------ | -------- | -------- | ------- | ------------------------------------------------------------------ |
| id                 | string   | true     |         | The identifier of the select                                       |
| containerClassName | string   | false    |         | names of custom css classes to apply to the select container       |
| selectClassName    | string   | false    |         | names of custom css classes to apply to the select                 |
| onSelect           | function | true     |         | handler triggered by the native change event of the select element |
| selectedValue      | string   | false    |         | the selected value of the options                                  |
| options            | array    | true     |         | array of the options in the select                                 |
