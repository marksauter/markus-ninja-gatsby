---
title: Hello Rust
date: "2019-02-28"
description: "Getting started with Rust programming language."
---

### Hello, World!

We install Rust using the command line tool `rustup`, which manages Rust
versions and associated tools.

Once we have rustup installed, we will have access to the Rust compiler:
`rustc`. We can use it to compile the following code:

```rs
// hello.rs

// The is the main function that will be called when the compiled binary is run.
fn main() {
    // Print text to the console
    println!("Hello, World!");
}
```

`$ rustc hello.rs` will a produce a binary file `hello` that, when executed,
will display the following:

```sh
$ ./hello
Hello, World!
```

### Macros

`println!` is a macro that prints text to the console.

Macros do not generate function calls, instead, they are expanded into source
code and compiled with the rest of your code.

We create macros using the `macro_rules!` macro!

```rs
// Define a simple macro say_hello {
macro_rules! say_hello {
    // '()' indicates that the macro takes no arguments
    () => {
        // The macro will expand into the contents of this block.
        println!("Hello");
    }
}

fn main() {
    // This will expand into `println!("Hello");`
    say_hello!()
}
```

Macros are useful in many ways.

1. DRY code. Macros help you repeat yourself less.
2. Define special syntax for specific purpose.
3. Variadic interfaces. `println!` is an example of a variadic interface that
    can take a variable number of arguments.

### Comments

Rust supports a couple different types of comments.

*Regular comments* which are ignore by the compiler.
`// This is a single line comment.`
`/* This is a block comment. */`

*Doc comments* which are parsed into HTML documentation.
`/// Generate library docs for the following item.`

```rs
fn main() {
    // Here we have a single line comment.
    // Followed by another single line comment.
    /*
    * Here we start a block comment.
    * With multiple lines.
    * Contained within.
    * The block.
    * NOTE: the leading '*'s are not necessary.
    */
}
```

Documentation can be generated using the `rustdoc` tool. Doc comments are
denoted by a `///`, and support Markdown.

````rs
// doc.rs
#![crate_name = "doc"]

/// A human being is represented here.
pub struct Person {
    /// A person must have a name to identify them by.
    name: String,
}

impl Person {
    /// Returns a person with the name given them
    ///
    /// # Arguments
    ///
    /// * `name` - A string slice that holds the name of the person
    ///
    /// # Example
    ///
    /// ```
    /// // You can have rust code between fences inside the comments
    /// // If you pass --test to Rustdoc, it will even test it for you!
    /// use doc::Person;
    /// let person = Person::new("name");
    /// ```
    pub fn new(name: &str) -> Person {
        Person {
            name: name.to_string(),
        }
    }

    /// Gives a friendly hello!
    ///
    /// Says "Hello, [name]" to the `Person` it is called on.
    pub fn hello(& self) {
        println!("Hello, {}!", self.name);
    }
}

fn main() {
    let john = Person::new("John");

    john.hello();
}
````

First build the library, then test it.

```sh
$ rustc doc.rs --crate-type lib
$ rustdoc --test --extern doc="libdoc.rlib" doc.rs
```

Or, just run `cargo test`, which does this all for you.

### Formatted print

In Rust, we handle printing with a series of macros defined in std::fmt.

* format!: writes formatted text to a `String`.
* print!: same as `format!` but writes to the console (io::stdout).
* println!: same as `print!` but a newline is appended to the end.
* eprint!: same as format! but writes to the standard error (io::stderr).
* eprintln!: same as eprint! but a newline is appended to the end.

```rs
fn main() {
    // Any `{}` will be replaced by the arguments passed. One argument per `{}`,
    // each will be stringified if able.
    println!("{} argument, ah ah ahh", 1)
    // 1 argument, ah ah ahh

    // Positional arguments may also be used.
    println!("{0} = {1}, {1} = {2}, {0} = {2}", "a", "b", "c")
    // a = b, b = c, a = c

    // The compiler will catch an incorrect number of arguments
    println!("My name is {0}, {1} {0}", "Bond");

    // You can also use named arguments.
    println!("the answer to the universe is {secret}", secret=42)
    // the answer to the universe is 42

    // Special formatting can be specified after a `:`
    println!("{0} (base 10) = {0:x} base 16", 20)
    // 20 (base 10) = 14 (base 16)

    // You can right-align text with a specified width.
    println!("{:>6}", 1)
    println!("{number:>width$}", number=1, width=6);
    // The previous two formats will have the same output.
    // (5 white spaces and a "1")
    // "     1"

    // You can pad numbers with extra zeroes. This will output "000001".
    println!("{:06}", 1);
    println!("{number:>0width$}", number=1, width=6);
    // The previous two formats will have the same output.
    // 000001

    // Create a structure which contains an `i32`. Name it `Structure`.
    struct Structure(i32);

    // However, custom types such as this structure require more complicated
    // handling. This will not compile.
    println!("This struct `{}` won't print...", Structure(3));
}
```
