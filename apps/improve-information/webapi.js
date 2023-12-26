/**
 * Created by feitingting on 2017/7/17.
 */
import Fetch from 'wmkit/fetch';

export const doPerfect = (params = {}) => {
  return Fetch('/perfect', {
    method: 'POST',
    body: JSON.stringify({
      ...params
    })
  });
};
