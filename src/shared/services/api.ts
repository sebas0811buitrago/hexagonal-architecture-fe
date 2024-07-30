import ky from 'ky';

const api = ky.create({
  hooks: {
    beforeRequest: [
      () => {
        console.log('before request ');
      }
    ]
  }
});

export default api;
