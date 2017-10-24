export const ADD_POST = 'ADD_POST'

export function addPost ({ day, recipe, meal }) {
  return {
    type: ADD_POST,
    title,
    body,
    author,
    category
  }
}
