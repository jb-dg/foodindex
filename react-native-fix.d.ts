// Fix for @types/react 19 + React Native class component incompatibility.
// React Native defines host components via `class X extends (Constructor<NativeMethods> & typeof XComponent)`,
// but @types/react 19 changed the JSX class component check to require the full React.Component interface.
// TypeScript can't properly resolve the instance type through the intersection, so these interfaces
// explicitly declare the missing React.Component properties via declaration merging.
import type React from 'react';
import type {
  TextProps,
  ViewProps,
  ImageProps,
  ScrollViewProps,
  TextInputProps,
  ActivityIndicatorProps,
  RefreshControlProps,
  SwitchProps,
} from 'react-native';

declare module 'react-native' {
  interface Text extends React.Component<TextProps> {}
  interface View extends React.Component<ViewProps> {}
  interface Image extends React.Component<ImageProps> {}
  interface ScrollView extends React.Component<ScrollViewProps> {}
  interface TextInput extends React.Component<TextInputProps> {}
  interface ActivityIndicator extends React.Component<ActivityIndicatorProps> {}
  interface RefreshControl extends React.Component<RefreshControlProps> {}
  interface Switch extends React.Component<SwitchProps> {}
}
