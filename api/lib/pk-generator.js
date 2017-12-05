const {
  compose,
  split,
  join,
  toLower,
  contains,
  drop,
  head,
  trim
} = require('ramda')

module.exports = (prefix, name, delimiter) =>
  prefix +
  compose(
    join(delimiter),
    arr => (contains(head(arr), ['a', 'the']) ? drop(1, arr) : arr),
    split(' '),
    toLower,
    trim
  )(name)
