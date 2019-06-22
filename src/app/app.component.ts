import { Component } from '@angular/core';

// Simple wrapper with generics
export interface Wrapper<T> {
  value: T;
}

export type PropertyWrapper<T> = {
  [K in keyof T]: Wrapper<T[K]>;
};

export interface Person {
  firstName: string;
  age: number;
}

// Form state abstraction with generics and conditional generics
export type PrimitiveType = string | number | boolean | null;

export interface FormStateControlBase {
  readonly untouched: boolean;
  readonly touched: boolean;
  readonly pristine: boolean;
  readonly dirty: boolean;
  readonly valid: boolean;
  readonly invalid: boolean;
  readonly pending: boolean;
  readonly disabled: boolean;
  readonly enabled: boolean;
  readonly errors?: string[];
}

export type FormStateGroupFields<F> = {
  [K in keyof F]: FormState<F[K]>;
};

export interface FormStateGroup<F> extends FormStateControlBase {
  readonly value: F;
  readonly fields: FormStateGroupFields<F>;
}

export interface FormStateArray<E> extends FormStateControlBase {
  readonly value: E[];
  readonly items: FormState<E>[];
}

export interface FormStateControl<T> extends FormStateControlBase {
  readonly value: T;
}

export type FormState<F> =
  F extends PrimitiveType ? FormStateControl<F> :
    F extends (infer E)[] ? FormStateArray<E> :
      FormStateGroup<F>;

// Sample helpers
const defaultFormState: FormStateControlBase = {
  dirty: false,
  pristine: true,
  disabled: false,
  enabled: true,
  invalid: false,
  valid: true,
  pending: false,
  touched: false,
  untouched: true
};

@Component({
  selector: 'app-root',
  template: `
    <h1>Webstorm2019.1 Angular Template engine with generics</h1>

    <h2>Wrapped Person Object</h2>
    <p>{{wrappedProperties.firstName.value}}</p>
    <p>{{wrappedProperties.age.value}}</p>


    <h2>Person Form State</h2>
    <p>{{personFormState.fields.firstName.value}}</p>
    <p>{{personFormState.fields.age.value}}</p>
  `
})
export class AppComponent {
  wrappedProperties: PropertyWrapper<Person> = {
    firstName: {
      value: 'Peter'
    },
    age: {
      value: 30
    }
  };
  personFormState: FormState<Person> = {
    ...defaultFormState,
    fields: {
      age: {
        ...defaultFormState,
        value: 30
      },
      firstName: {
        ...defaultFormState,
        value: 'Peter'
      }
    },
    value: {
      firstName: 'Peter',
      age: 30
    }
  }
}
