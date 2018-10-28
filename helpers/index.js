import * as R from 'ramda';
import createModuleSaga from './createModuleSaga';
import sagaTrigger from './sagaTrigger';
import sagaWrapper from './sagaWrapper';

export const idEq = R.propEq('id');

export const findIndexById = (id, items) => R.findIndex(idEq(id), items);

export const setError = R.set(R.lensProp('error'));

export const moduleAction = moduleName => action => [moduleName, action].join('/');
export const successCase = moduleName => action => `${moduleAction(moduleName)(action)}_success`;

export const getUrl = (moduleName, parent, payload) => `${parent ? `/${parent}/${payload[`${parent}_id`]}` : ''}/${moduleName}`;

export { createModuleSaga, sagaTrigger, sagaWrapper };
