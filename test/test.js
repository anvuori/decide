let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

let should = chai.should();

chai.use(chaiHttp);

describe('/post option', function(){
	it('tests if it chooses one', (done) => {
        let options = ["kissa", "koira", "kilpikonna"];
		
		chai.request(server)
            .post('/chooseOne')
            .send(options)
            .end((err, res) => {
                res.should.have.status(200);
				res.text.should.exist;
				options.should.include(JSON.parse(res.text));
              done();
            });
      });
	  
	it('tests if it works with JSON objects', (done) => {
        let options = [{"name" : "kissa", "id" : 0}, {"name" : "koira", "id" : 1}, {"name" : "kissa", "id" : 4}];
		
		chai.request(server)
            .post('/chooseOne')
            .send(options)
            .end((err, res) => {
                res.should.have.status(200);
				res.text.should.exist;
				options.should.include(JSON.parse(res.text));
              done();
            });
      });
		
	});
	
