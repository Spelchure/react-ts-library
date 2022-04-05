# Lerna & Rollup & Typescript React Library

In this repository i gonna show you writing Typescript library with RollupJS & LernaJS using
multiple workspaces. Mentioned topics:

- [RollupJS](https://rollupjs.org/guide/en/)
- [LernaJS](https://lerna.js.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)

![Lerna & TS & Rollup](./Cover.png)

# Table of Contents

- [1. Building Project Structure](#BuildingProjectStructure)
  - [**1.1. Installing and Initializing Lerna**](#1.1.InstallingandInitializingLerna)
  - [**1.2. Initializing Folder Structure**](#1.2.InitializingFolderStructure)
- [2. Configuring Project](#ConfiguringProject)
  - [**2.1. Configuring Lerna**](#2.1.ConfiguringLerna)
  - [**2.2. Configuring `package.json`**](#2.2.Configuringpackage.json)
- [3. Creating Library](#CreatingLibrary)
  - [**3.1. Installing 3rd Party Packages to Library**](#3.1.Installing3rdPartyPackagestoLibrary)
  - [**3.2. Configuring Typescript & Rollup**](#3.2.ConfiguringTypescriptRollup)
  - [**3.3. `package.json` Configuration**](#3.3.package.jsonConfiguration)
- [4. Coding and Compiling Library](#CodingandCompilingLibrary)
  - [**4.1. Building Library**](#4.1.BuildingLibrary)
- [5. Using the Library](#UsingtheLibrary)
  - [**5.1. Usage of Library**](#5.1.UsageofLibrary)
  - [**5.2. Watching for Changes**](#5.2.WatchingforChanges)
  - [**5.3. Creating Tarball of Library**](#5.3.CreatingTarballofLibrary)
- [6. Cloning Repo And Compiling](#CloningRepoAndCompiling)

### <a name='1.WhatisLernaJS'></a>**1. What is LernaJS ?**

Thanks to LernaJS, we can effectively keep large projects in a single
repository. Large and complex projects can be kept in multiple repositories, but
this makes it difficult to monitor, share code, track and test the project.
Lerna finds a solution to this problem and keeps the projects divided into
multiple small projects in a single GIT repository and enables them to be managed in
a systematic way. LernaJS works with GIT and NPM to optimize the working
environment. If you want to check out their site:
[LernaJS](https://lerna.js.org/)

### <a name='2.WhatisRollupJS'></a>**2. What is RollupJS ?**

Rollup is a module wrapper for javascript. It kind of functions the same as Webpack. Compared to Webpack, their performance is almost equal, but Rollup's configuration is lighter than Webpack. Module wrappers combine source code into a single file to give you minimized Javascript code. In addition, Rollup can give outputs for us according to different module systems. For example CommonJS,UMD and ES. For Rollup's site: [RollupJS](https://rollupjs.org/guide/en/)

### <a name='3.YarnWorkspaces'></a>**3. Yarn Workspaces**

Yarn workspaces allow us to divide the project into several workspaces. Thus, the libraries required for all projects can be installed with a single **yarn install** command. It came with **Yarn 1.0**. For detailed information:
[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)

## <a name='BuildingProjectStructure'></a>1. Building Project Structure

While creating described project, two sample projects using the our library with JS and TS will be added to test the library and they will be in a single directory. In addition, Konva library will be used to show the how to use 3rd party libraries that the our library is dependent on with Rollup. **Konva** is a separate package (react-konva) library for React that allows us to make two-dimensional drawings with Javascript or Typescript.

### <a name='1.1.InstallingandInitializingLerna'></a>**1.1. Installing and Initializing Lerna**

The following command will install Lerna to NodeJS global modules directory. With this command, Lerna will be permanently installed on our system. (NOTE: Since we do not install it locally, it may ask for administrator permissions)

```sh
npm install -g lerna
```

And initializing lerna with...

```sh
lerna init
```

This command will create `package.json` and `lerna.json` in our root directory.

### <a name='1.2.InitializingFolderStructure'></a>**1.2. Initializing Folder Structure**

```
./react-ts-library
|  |-- examples/
|  |-- packages/ (lerna init created)
|  |   |-- react-ts-library/
|  |-- lerna.json (lerna init created.)
|  |-- package.json (lerna init created.)
```

In this structure, the `examples/` directory contains the React projects written in JS and TS, where we will test the library, and the `packages/` directory contains our library. The `lerna.json` file is the configuration file of Lerna.

---

## <a name='ConfiguringProject'></a>2. Configuring Project

### <a name='2.1.ConfiguringLerna'></a>**2.1. Configuring Lerna**

We need to make some adjustments for the project in our root directory, for this the
`lerna.json` and `package.json` files will be changed.

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "independent"
}
```

Definition of terms:

- **npmClient** : Says to Lerna, use npm command as yarn.
- **useWorkspaces** : Says to Lerna, use yarn workspaces.
- **version** : Indicates that the projects that we will create have independent versions.

### <a name='2.2.Configuringpackage.json'></a>**2.2. Configuring `package.json`**

The `package.json` in the root directory should be changed following

```json
{
  "name": "root",
  "private": true,
  "workspaces": ["packages/*", "examples/*"],
  "scripts": {
    "build": "lerna run build --scope react-ts-library",
    "watch": "lerna run watch --scope react-ts-library",
    "start": "lerna run start --scope react-ts-example",
    "package": "lerna exec --scope react-ts-library -- npm pack"
  },
  "devDependencies": {
    "lerna": "^4.0.0"
  }
}
```

- **private**: Prevents publishing package mistakenly
- **workspaces**: Specifies directories as yarn workspaces.

What is written under **scripts** states what the parameters given to the yarn command will do. For example, when yarn build command is entered from command line in root directory, `lerna run build --scope react-ts-library` command runs. This command allows lerna to go to where the react-ts-example project is and run the command defined for build in the project's `package.json` file. (under scripts)

---

## <a name='CreatingLibrary'></a>3. Creating Library

Our library can be created like following

```sh
cd packages/react-ts-library
yarn init -y
cd ../../
```

### <a name='3.1.Installing3rdPartyPackagestoLibrary'></a>**3.1. Installing 3rd Party Packages to Library**

We can select the project to be processed by giving the `scope` parameter to lerna from the root directory. When adding a package to a project, you can use the `lerna add` or `yarn add` command.(by going to the directory of that project for yarn). To install packages with Lerna using `scope` parameter

```sh
lerna add react --scope react-ts-library --peer;
lerna add react-dom --scope react-ts-library --peer;
```

With this command, we add `React` and `React-DOM` packages to our project as **peer dependency**. This means that our library needs React, React-DOM packages and anyone who wants to use the library needs to install these packages themselves, because we are building a React library, so both sides (user and library) need React and React-DOM packages.

For installing remaining libraries with yarn(you can also use lerna):

```sh
cd packages/react-ts-library/
yarn add -D rollup typescript rollup-plugin-typescript2 @rollup/plugin-commonjs react react-dom
```

These packets are used for:

- **rollup**: Bundling our library
- **typescript**: Typescript compiler
- **rollup-plugin-typescript2**: Typescript support for Rollup
- **@rollup/plugin-commonjs**: Converts commonjs modules to es modules to be
  used in rollup.

_NOTE: The `-D` parameter given to yarn here indicates that the packages will be used only at development time. Also, the reason for adding react and react-dom again is that these packages are added as peer dependency. By adding React packages here only for use at development time, we prevent the Typescript compiler from throwing errors._

### <a name='3.2.ConfiguringTypescriptRollup'></a>**3.2. Configuring Typescript & Rollup**

The `tsconfig.json` file should be created with the following content in the directory where our library project is located. This file tells the Typescript compiler (tsc) which files it should compile, what syntax checks it should do, etc.

```json
{
  "compilerOptions": {
    "outDir": "lib/esm",
    "module": "esnext",
    "target": "es5",
    "lib": ["es6", "dom", "es2016", "es2017"],
    "jsx": "react-jsx",
    "declaration": true,
    "moduleResolution": "node",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "esModuleInterop": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*.ts*"],
  "exclude": ["node_modules", "lib"]
}
```

For rollup configuration, in the library project folder `rollup.config.js`:

```js
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./lib/cjs/index.js",
      format: "cjs",
    },
    {
      file: "./lib/esm/index.js",
      format: "es",
    },
  ],
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    commonjs(),
    typescript({
      typescript: require("typescript"),
    }),
  ],
};
```

Here, with the **input** parameter, we give the path to the file that specifies the functions and definitions that our library exports. Rollup takes this file as input and creates two files as output. One of them is `/lib/cjs/index.js` file in CommonJS format and the other is `/lib/esm/index.js` file in ES format.

The values we specify **externally** are exactly the **peerDependencies** part defined in the `package.json` file of our library project. Thanks to this
parameter rollup will not add these libraries to our bundle because user
should install these libraries itself.

### <a name='3.3.package.jsonConfiguration'></a>**3.3. `package.json` Configuration**

In order to set our project as a library and run the rollup automatically(**watching**), we need to make a few changes in the `package.json` file, for this the `package.json` file is edited as follows:

```json
{
  "name": "react-ts-library",
  "version": "1.0.0",
  "main": "./lib/cjs/index.js",
  "module": "./lib/esm/index.js",
  "types": "./lib/esm/index.d.ts",
  "files": ["/lib"],
  "license": "MIT",
  "scripts": {
    "prepack": "yarn build",
    "build": "rollup -c",
    "watch": "rollup -cw"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^21.0.3",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "rollup": "^2.70.1",
    "rollup-plugin-typescript2": "^0.31.2",
    "typescript": "^4.6.3"
  }
}
```

- **main**: The main file of our library.
- **module**: The ES module path that our library exports.
- **types**: Typescript type definition file path.
- **files**: Folder and files that packed with NPM.

The commands writed inside **scripts** means:

- **rollup -c**: Rollup compile. Bundles our library.
- **rollup -cw**: Rollup watch changes and compile.

Don't forget that the commands defined here will work with the `yarn build` and `yarn watch` commands run in the root directory. (See `package.json` : lerna run build --scope react-ts-library)

Finally we need to add 3rd party library Konva to our library:

```sh
cd packages/react-ts-library
yarn add konva react-konva
```

---

## <a name='CodingandCompilingLibrary'></a>4. Coding and Compiling Library

First we need to create required folders in library project path:

```sh
cd packages/react-ts-library
mkdir src/ lib/
```

Then, `index.ts` file should be created for the definitions and values that our library wants to export in the src directory, and a React component `HelloLibrary.tsx` should be created for its functionality.

**For component: `src/HelloLibrary.tsx`**

```tsx
import { Rect, Stage, Layer } from "react-konva";

export interface IHelloLibraryProps {
  text: string;
  rectWidth: number;
  rectHeight: number;
  rectColor: string;
}

export default function HelloLibrary(props: IHelloLibraryProps) {
  return (
    <>
      <h1>React Typescript Library: {props.text}</h1>
      <Stage width={300} height={300}>
        <Layer>
          <Rect
            x={0}
            y={0}
            stroke="black"
            fill={props.rectColor || "green"}
            strokeWidth={2}
            width={props.rectWidth || 50}
            height={props.rectHeight || 50}
          />
        </Layer>
      </Stage>
    </>
  );
}
```

**For exports: `src/index.ts`**

```ts
/* default export, can be imported as 
    import HelloLibrary from "react-ts-library"
 */
export { default } from "./HelloLibrary";

/* named export, can be imported as 
    import {IHelloLibraryProps} from "react-ts-library";
*/
export { IHelloLibraryProps } from "./HelloLibrary";
```

### <a name='4.1.BuildingLibrary'></a>**4.1. Building Library**

```sh
yarn build
```

If you haven't received any errors after this command, you can examine the files in the `esm/` and `cjs/` directories under the lib/ folder. Our ES modules reside in the `esm/` folder and for the CommonJS modules in the `cjs/` folder.

---

## <a name='UsingtheLibrary'></a>5. Using the Library

To create sample projects, go to the `examples/` folder in the root directory, and then create two React projects with TS and JS:

```sh
yarn create react-app react-ts-example --template typescript
yarn create react-app react-js-example
```

For adding our library to created projects with lerna:

```sh
lerna add react-ts-library --scope react-ts-example
lerna add react-ts-library --scope react-js-example
```

### <a name='5.1.UsageofLibrary'></a>**5.1. Usage of Library**

In typescript react project, `App.tsx`

```tsx
import React from "react";
import "./App.css";
// importing library
import HelloLibrary from "react-ts-library";

function App() {
  return (
    <div className="App">
      <HelloLibrary
        text="Hello"
        rectColor="red"
        rectHeight={80}
        rectWidth={80}
      />
    </div>
  );
}

export default App;
```

In javascript react project, `App.jsx`

```jsx
import "./App.css";
import HelloLibrary from "react-ts-library";

function App() {
  return (
    <div className="App">
      <HelloLibrary text="hello-js" />
    </div>
  );
}

export default App;
```

```sh
yarn start
```

### <a name='5.2.WatchingforChanges'></a>**5.2. Watching for Changes**

If we want the rollup to watch the changes and recompile the code, if we want to work on the library and work on our sample projects at the same time, the `watch` script we have created in the root directory could be called.

For watching changes:

```sh
yarn watch
```

Starting example projects:

```sh
yarn start
```

Thus, any changes we make in the library or project will be applied automatically.

### <a name='5.3.CreatingTarballofLibrary'></a>**5.3. Creating Tarball of Library**

We can create compressed archive of our library as follows:

```sh
yarn package
```

And for installing library locally from archive:

```sh
npm install /path/to/archive/react-ts-library.tgz
```

---

## <a name='CloningRepoAndCompiling'></a>6. Cloning This Repo And Building

For cloning this repository and making it ready:

```sh
git clone https://github.com/Spelchure/react-ts-library.git
lerna bootstrap
cd examples/react-ts-example
yarn start
```
