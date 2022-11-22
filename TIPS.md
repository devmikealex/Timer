[javascript - Passing object with predefined props to class constructor es6 - Stack Overflow](https://stackoverflow.com/questions/35675275/passing-object-with-predefined-props-to-class-constructor-es6)

---

[Using BEM in LESS like SASS using parents - Stack Overflow](https://stackoverflow.com/questions/64496595/using-bem-in-less-like-sass-using-parents)

```less
.s-body {
  @self: .s-body;
  
  &__door {
    color: red;
    &--state-past {
      @{self}__image {
          color: red;
      }
    }
  }
  &__image {
    color: red;
  }
}
```

```css
.s-body__door {
  color: red;
}
.s-body__door--state-past .s-body__image {
  color: red;
}
.s-body__image {
  color: red;
}
```