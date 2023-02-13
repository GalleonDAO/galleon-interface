# Galleon interface

### [GALLEON-DAPP DEPRECIATION]
galleon-dapp within this repository is now not being developed but can still be forked, maintained & self-hosted

[![License](https://img.shields.io/:license-mit-blue.svg)](https://opensource.org/licenses/MIT)

## Local development

This project was created with [create-react-app](https://create-react-app.dev/). Refer to their docs for advanced usage.

### Prerequisites

1. Install [Node](https://nodejs.org/en/) 14+
1. Install [yarn](https://yarnpkg.com/getting-started/install)
1. Fork this repo
1. Clone your fork locally

### Steps

1. Make a copy of the prod env file

   ```bash
   cp .env.prod .env
   ```

1. Install all the dependencies

   ```bash
   yarn install
   ```

1. Start the app in development mode on localhost:3000 and run the tailwindcss compiler in seperate terminal

   ```bash
   yarn start
   ```

   ```bash
   yarn build:css
   ```

1. Navigate to [http://localhost:3000/](http://localhost:3000/). The changes you make locally should live-reload in the app.

---

## Testing

### Unit tests

Run unit tests in watch mode

```bash
yarn test
```

### Helpful Commands

Build the app for production in the `build` folder.

```
yarn build
```

Eject the app from `create-react-app` rails.

```
yarn eject
```

This project uses [browserslist](https://github.com/browserslist/browserslist). We need to [regularly update browser data](https://github.com/browserslist/browserslist#browsers-data-updating) via

```bash
npx browserslist --update-db
```

## Contributing

The main purpose of this repository is to continually serve the needs of Galleon, making it faster, simpler, and easier to use. As new proposals are submitted and the scope of Galleon's governance evolves, we anticipate this tool will change as well.

We greatly encourage any community contribution that may help Galleon reach more users and promote greater adoption, so be sure to check out our [Contribution Guidelines](https://github.com/GalleonDAO/Galleon-interface/blob/main/app/CONTRIBUTING.md) for ways to get involved with our project.

## Style Guide

### Absolute imports

Prefer absolute imports over relative imports because this is a loose codebase convention. Refer to [Configuring React Absolute Imports For TypeScript](https://justinnoel.dev/2019/06/18/configuring-react-absolute-imports-for-typescript/) if your editor isn't picking up absolute imports.

```typescript
// Good
import Page from 'components/Page'

// Bad
import Page from '../../components/Page'
```

### Import ordering

Order library imports at the top of the file, then a newline separator, then imports for exported members that are defined in this package.

```typescript
// Good
import React, { useEffect } from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import Explanation from 'components/Explanation'
```

```typescript
// Bad
import React, { useEffect } from 'react'
import Page from 'components/Page'
import { Container, Spacer } from 'react-neu'
import Explanation from 'components/Explanation'
```

## License

Galleon interface is MIT licensed.
