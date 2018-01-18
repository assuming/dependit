# dependit

Parse all the `import`ed modules inside the file(Only **ES Modules** supported)

## Usage

```js
import getDependency from 'dependit'

const filepath = '/path/to/your/file'
const result = getDependency(filepath)
```

## API Documentation

### `getDependency(filepath)`

- **`filepath`** absolute path to your file

#### Returned object

The return value is an object with all the dependencies information. The object's structure is listed below using TypeScript.

```ts
interface Result {
  path: string,
  dependencies: Array<Dependency>
}

interface Dependency {
  source: string,
  imported: Array<ImportedItem>
}

interface ImportedItem {
  value: string,
  local: string,
  type: ImportType
}

enum ImportType {
  default = 'ImportDefault',
  import = 'Import',
  namespace = 'ImportNamespace'
}
```