import { jest } from '@jest/globals';
import request from 'supertest';
import app from '../dir/src/app.js';
const consult = jest.fn();

jest.unstable_mockModule('../dir/src/models/db.js', () => ({
  executeConsult: consult,
}));

describe('Pruebas de la Aplicación Express', () => {
  beforeEach(() => {
    consult.mockClear();
  });

  describe('API Endpoint: POST /api/v1/short', () => {
    it('debería acortar una URL válida y retornar un JSON con la URL acortada', async () => {
      consult.mockResolvedValueOnce({ rowCount: 1 });

      const response = await request(app)
        .post('/api/v1/short')
        .send({ orig_url: 'https://google.com' });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('La url a sido acortada con existo.');
    });

    it('debería retornar 404 si no se provee orig_url', async () => {
      const response = await request(app)
        .post('/api/v1/short')
        .send({ name: 'un nombre cualquiera' }); // Sin orig_url

      expect(response.status).toBe(404);
      expect(response.body).toEqual("Upps , URL provided is missing, please provide a valid URL.");
    });

    it('debería retornar 417 para una URL inválida', async () => {
      const response = await request(app)
        .post('/api/v1/short')
        .send({ orig_url: 'esto-no-es-una-url' });
 
      expect(response.status).toBe(417);
      expect(response.body).toEqual('Upps! route not found, the url is not valid, try something like: https://example.com');
    });
  });

  describe('Endpoint de Redirección: GET /:short_url', () => {
    it('debería redirigir a la URL original si la URL corta existe', async () => {
      const response = await request(app)
        .post('/api/v1/short') 
        .send({ orig_url: 'https://google.com' });

        const url_short = response.body.url_acortada;
        const lasParts = url_short.substring(url_short.lastIndexOf('/') + 1);
        
      const responseData = request(app).get(`/${lasParts}`);
      expect((await responseData).status).toBe(302);
      expect((await responseData).headers.location).toBe('https://google.com');
  }); 


  it('debería retornar 404 si la URL corta no existe', async () => {
    consult.mockResolvedValueOnce({ rows: [] }); 

    const response = await request(app).get('/url-inexistente');

    expect(response.status).toBe(404);
  });
});

describe('Manejador de 404', () => {
  it('debería retornar el archivo error.html para rutas no existentes', async () => {
    const response = await request(app).get('/esta/ruta/no/existe');
    expect(response.status).toBe(404); 
  });
});
});  