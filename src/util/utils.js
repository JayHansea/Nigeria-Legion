export default class Util {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.error = null;
    }
  
    setSuccess(statusCode, data) {
      this.statusCode = statusCode;
      this.data = data;
      this.type = 'success';
    }
  
    setError(statusCode, error) {
      this.statusCode = statusCode;
      this.error = error;
      this.type = 'error';
    }

    send(res) {
        const result = {
          status: this.type,
          data: this.data,
        };
    
        if (this.type === 'success') {
          return res.status(this.statusCode).json(result);
        }
        return res.status(this.statusCode).json({
          status: this.type,
          error: this.error,
        });
      }
  }