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

The only style that may come about is `flex` related primarily to set the direction to be a sane default but can still be overriden

## Components

### Pressable

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
Note I don't have to put the slots in the order.  It would render as

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

### Text Input Field

```tsx
<View>
  <StartIcon />

  <TextInput />
  <EndIcon />
</View>
```
