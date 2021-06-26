# CategoryBar

Shows the menu of categories

## Usage

```jsx
const categories = [
  'element 1',
  'element 2',
  'element 3',
  'element 4',
  'element 5',
]

export const SampleCard = () => (
  <CategoryBar
    categories={categories}
    selected="element 1"
    onClick={() => {}}
  />
)
```

## Props

| Name       | Type          | Required | Default | Description                    |
| ---------- | ------------- | -------- | ------- | ------------------------------ |
| categories | array<string> |          |         | the list of categories to show |
| selected   | string        |          |         | the selected category          |
| onClick    | func          |          |         | the callback on click          |
