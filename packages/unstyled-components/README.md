# Unstyled components

Just a train of thought to have a component library that is free from styling.
So I am thinking this would only have

- `<View>` or `<Animated.View>` if applicable
- `<Pressable>`
- `<MyText>` which renders down to `<Text>`
- `<MyTextInput>` which renders down to `<TextInput>`

I basically want to allow developers to focus on styling rather than functionality.

## Pattern

The components are unstyled but specific props to contain the style will be passed in. The most common one is `contentContainerStyle` to reflect some parity with React Native ScrollView and KeyboardAvoidingView.

The only style that may come about is `flex` related primarily to set the direction to be a sane default but can still be overriden.

Accessibility is on the `Pressable` .

It does impose a few restrictions

Groups of radio buttons or checkboxes must stay together and be close to a legend.

The label to a field is relatively close by.

This differs from most other component libraries in that the focus was not to provide a ready to use component but to provide the foundation to build the UIs to however you client wants it to look.

## Visual Components

These render the components with a typical order and layout.

### IconContentRow

This is the foundational component for every visual element.  It consists of

```ascii
+--------+------------------+--------+
|        |                  |        |
| start  |     content      |  end   |
|        |                  |        |
+--------+------------------+--------+
```

they are laid out in a `flexDirection:row` view
### Button

```tsx
<UnstyledButton
  style={{ wrapperStyle }}
  contentContainerStyle={{ contentContainer }}
  testID="test-id"
>
  <UnstyledButton.StartIcon style={{ startIconStyle }}>
    <Image src="startImage" />
  </UnstyledButton.StartIcon>
  <UnstyledButton.EndIcon>
    <Icon src="endIcon" />
  </UnstyledButton.EndIcon>
  <Text>Hello world</Text>
  <Text>Stinky Tofu</Text>
</UnstyledButton>
```

Note I don't have to put the slots in the order. It would render as

```tsx
<View style={{ wrapperStyle }} testID="test-id_wrapper">
  <View style={{ startIconStyle }} testID="test-id_startIcon">
    <Image src="startImage" />
  </View>
  <View style={{ contentContainerStyle }} testID="test-id">
    <Text>Hello world</Text>
    <Text>Stinky Tofu</Text>
  </View>
  <View style={{ startIconStyle }} testID="test-id_endIcon">
    <Icon src="endIcon" />
  </View>
</View>
```

## Accessible components

These are the ones that would provide the actual control behaviour. These would be `Pressable`

Use as a group

```tsx
<UnstyledRadio.Fieldset>
  <UnstyledRadio>
  <UnstyledRadio>
  <UnstyledRadio>
</UnstyledRadio.Fieldset>
```

A Pressable would focus on the states

```tsx
<Pressable>
  <When state={['focused', 'hover']} style={} testID="foo">
    <Button>
      <StartIcon />
      <Content />
      <EndIcon />
    </Button>
  </When>
  <When state={['pressed']} style={} testID="foo" />
  <Disabled />
  <Default />
</Pressable>
```

### Button

Is the same as pressable except the Content is not customizable and instead there's a `label` prop.

```tsx
<Pressable>
  <StartIcon />
  <Content>
    <Text />
  </Content>
  <EndIcon />
</Pressable>
```

### Picklists

These will pop up an overlay view containing a FlashList

### Dates or other controls

These will pop up an overlay View, the overlay view is `position: absolute`

### Text Input Field

```tsx
<View>
  <View>
  <View id="Label">
    <IconContentRow>
  </View>
  <View id="field">
  <IconContentRow>
  </View>
</View>
  <View id="no-errors">
    {// a viewbox if there's no errors }
  </View>
  <View id="errors">
    <View>
      <Error />
    </View>
    <View>
      <Error />
    </View>
  </View>
</View>
```

### Fieldset

```
<View>
<View>
<Legend />
</View>

<View style={{flexDirection:row, flexWrap:"wrap"}}>
  <Options>
</View>
</View>
```

### Tri-state checkbox

```
<Pressable>
  <When Y><IconContentRow></When>
  <When N><IconContentRow></When>
  <When U><IconContentRow></When>
</Pressable>
```

Adds an _indeterminate_ state

### Radio button

### Standard checkbox
