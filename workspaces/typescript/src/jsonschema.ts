import {
  InputData,
  jsonInputForTargetLanguage,
  JSONSchemaTargetLanguage,
  quicktypeMultiFileSync,
} from 'quicktype-core';
import { Validator } from 'jsonschema';

const validator = new Validator();

const json = JSON.stringify({
  foo: 10,
  bar: 'abc,',
});

const input = new InputData();
const srcJsonData = {
  name: 'SampleSchema',
  samples: [json],
};

const makeInput = () =>
  jsonInputForTargetLanguage(new JSONSchemaTargetLanguage(), undefined, false);
input.addSourceSync('json', srcJsonData, makeInput);

const qtResult = quicktypeMultiFileSync({
  lang: new JSONSchemaTargetLanguage(),
  inputData: input,
});

const schema = qtResult.get('stdout')?.lines.join('');
console.log(JSON.parse(schema ?? '{}'));

const result = validator.validate(
  { foo: 2, bar: 'test' },
  JSON.parse(schema ?? '{}'),
);
console.log(result);
console.log(result.valid);
