
// importar express
var express = require('express');
const mysql = require('mysql');
// importar o handlebars
const exphbs = require('express-handlebars')
// variável para definir o express
var app  = express();
var port = 3000

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '../../' + '/public'));

app.use(
    express.urlencoded({ 
        extended: true
}));


//rotas 
app.get('/', (req, res) => {
    res.render('home', { layout: false })
    })
    //express url
    app.use(
    express.urlencoded({
      extended: true
      
    }) 
    )
    //rota para inserir dados (AgÊncia Caio)
    app.post('/unid/insertunid', (req, res) => {
    const nome = req.body.nome
    const cidade = req.body.cidade
    const qtd = req.body.qtd
    const id = req.body.id
    
    
    const sql = `INSERT INTO agencias (nome, cidade, qtd, id) VALUES ('${nome}', '${cidade}','${qtd}', '${id}')`
    
    conn.query(sql, function(err){
      if (err){
          console.log(err)
      }
    
      res.redirect('/')
    })
    })
    //rota de consulta geral
    app.get('/unid', (req, res) => {
    const sql = 'SELECT * FROM agencias'
    
    conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }
    
      const listar = data
      
      console.log(listar)
    
      res.render('unid', { layout: false, listar })
    
    })
    })
    
    // consulta um registo pelo id (produto.handlebars)
    app.get('/unid/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM agencias WHERE id = '${id}'`
    
    conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }
    
      const listarUnid = data[0]
      res.render('agnc', {  layout: false, listarUnid } )
    
    })
    })
    
    //rota do buscar
    app.get('/busca', (req, res) => {
    res.render('busca', { layout: false })
    })
    
    app.get('/cadastro_agnc', (req, res) => {
      res.render('cadastro_agnc', { layout: false })
      })
      app.get('/cadastro_client', (req, res) => {
        res.render('cadastro_client', { layout: false })
        })
        app.get('/cadastro_func', (req, res) => {
          res.render('cadastro_func', { layout: false })
          })
          app.get('/cadastro_car', (req, res) => {
            res.render('cadastro_car', { layout: false })
            })
            app.get('/cadastro_emp', (req, res) => {
              res.render('cadastro_emp', { layout: false })
              })

          


    //rota busc para exibir o resultado do buscar
    app.post('/busc/', (req, res) => {
    const id = req.body.cidade
    const sql = `SELECT * FROM agencias WHERE cidade = '${id}'`
    
    conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listar = data
     res.render('busc', {  layout: false, listar} )
     })
    })
    
    //pegando para editar registro
    app.get('/unid/edit/:id', (req, res) => {
    
    const id = req.params.id
    
    const sql = `SELECT * FROM agencias where id = '${id}'`
    
    conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }
    
      const unid = data[0]
      res.render('edit_agnc', { layout: false, unid } )
    
    })
    })
    //rota de edicao do registro com post
    app.post('/unid/updateunid', (req, res) => {
    
      const cidade = req.body.cidade
      const nome = req.body.nome
      const qtd = req.body.qtd  
      const id = req.body.id
      const sql = `UPDATE agencias SET nome = '${nome}', cidade = '${cidade}', qtd = '${qtd}' WHERE id = '${id}'` 
    
      conn.query(sql, function(err) {
          if(err){
              console.log(err)
              return
          }
    
          res.redirect('/unid')
      })
    })
    //rota para deletar um registro (Agência Caio Final)
    app.get('/unid/remove/:id', (req, res) => {
      const id = req.params.id
    
      const sql = `DELETE FROM agencias WHERE id = '${id}'`
    
      conn.query(sql, function(err){
          if(err){
              console.log(err)
              return
          }
    
          res.redirect('/unid')
      })
    })
    
    //CREATE

app.post('/carros/insertcarro', function (req, res) {
  const modelo = req.body.title
  const placa = req.body.placa
  const km = req.body.km

  const query = `INSERT INTO carros (modelo, placa, km) VALUES ('${modelo}', '${placa}', '${km}')`

  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/carros')
  })
})

//READ

app.get('/carros', function (req, res) {
  let query = 'SELECT * FROM carros'

  if (req.query.q) {
    const modelo = req.query.q
    query = `SELECT * FROM carros WHERE modelo LIKE '%${modelo}%'`
  }

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const carros = data

    console.log(data)

    res.render('carros', { carros })
  })
})



app.get('/carros/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM carros WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const carro = data[0]

    console.log(data[0])

    res.render('carro', { carro })
  })
})

app.get('/carros/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM carros WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const carro = data[0]

    console.log(data[0])

    res.render('editcarro', { carro })
  })
})



//UPDATE

app.post('/carros/editcarro', (req, res) => {
  const id = req.body.id;
  const km = req.body.km;


  console.log(id, km);
  
  const query = `UPDATE carros SET km = '${km}' WHERE id = ${id}`

  conn.query(query, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/carros');
  })
})



app.post('/carros/remove/:id', function (req, res) {
  const id = req.params.id

  const sql = `DELETE FROM carros WHERE id = ${id}`

  conn.query(sql, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/carros`)
  })
})

// (Carros Carlos Eduardo)

// (Cliente Igor)
//rota para inserir dados
app.post('/client/insertclient', (req, res) => {
    const id = req.body.id
    const cpf = req.body.cpf
    const nome = req.body.nome
    const telefone = req.body.telefone
  
    const sql = `INSERT INTO client (id, cpf, nome, telefone) VALUES ('${id}', '${cpf}', '${nome}', '${telefone}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
        res.redirect('/cadastro_client')
})});

//rota de consulta
app.get('/client', (req, res) => {
    const sql = 'SELECT * FROM client'

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    const listar = data 
    console.log(listar)
    res.render('client', { layout: false, listar })
})});

//consulta um registo pelo id (produto.handlebars)
app.get('/client/:cpf', (req, res) => {
    const cpf = req.params.cpf 
    const sql = `SELECT * FROM client WHERE cpf = ${cpf}`;
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const listarClient = data[0]
        res.render('clientes', {layout: false, listarClient})
    })
});

//rota de busca 
app.get('/busc_client', function(req, res){
    res.render('busc_client', {layout: false})
});

app.post('/busca_client/', (req, res) => {
    const cpf = req.body.cpf
    const sql = `SELECT * FROM client WHERE cpf = ${cpf}`  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarClient = data[0]
       res.render('busca_client', {  layout: false, listarClient } )
    })
});

//pegando para editar o registro
app.get('/client/edit/:cpf', (req, res) => {
    
    const cpf = req.params.cpf

    const sql = `SELECT * FROM client WHERE cpf = '${cpf}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const client = data[0]
        res.render('edit_client', { layout: false, client } )
    })
});

//rota de edicao do registro com post
app.post('/client/updateclient', (req, res) => {

    const cpf = req.body.cpf
    const nome = req.body.nome
    const telefone = req.body.telefone
    
    const sql = `UPDATE client SET nome = '${nome}', telefone = '${telefone}' WHERE cpf = '${cpf}'` 

    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/client')
    })
});

//pegando para apagar um registro
app.get('/client/remove/:cpf', (req, res) => {
    
    const cpf = req.params.cpf

    const sql = `DELETE FROM client where cpf = ${cpf}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/client')
    })
});
//(Cliente Igor)
//Funcionário (Wesley)

//rota para inserir dados funcionário (wesley)
app.post('/func/insertfunc', (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const cargo = req.body.cargo
  
    const sql = `INSERT INTO funcionario (nome, cpf, cargo) VALUES ('${nome}', '${cpf}', '${cargo}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/')
    })
  })
  //rota de consulta geral funcionário (wesley)
  app.get('/func', (req, res) => {
    const sql = 'SELECT * FROM funcionario'
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    
        const listar = data
        
        console.log(listar)
  
        res.render('consulta_geral_func', { layout: false, listar })
  
    })
  })
  
  // consulta um registo pelo id - funcionário (wesley)
  app.get('/func/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM funcionario WHERE id = ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarProd = data[0]
        res.render('consulta_por_id_func', {  layout: false, listarProd } )
  
    })
  })
  
  //rota do buscar - funcionário (wesley)
  app.get('/busca_func', (req, res) => {
    res.render('busca_func', { layout: false })
  })
  
  
  //rota busc para exibir o resultado do buscar - funcionário (wesley)
  app.post('/busc_func/', (req, res) => {
    const id = req.body.id
    const sql = `SELECT * FROM funcionario WHERE id = ${id}`
  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarProd = data
       res.render('busc_func', {  layout: false, listarProd } )
       })
      })
  
  //pegando para editar registro - funcionário (wesley)
  app.get('/func/edit/:id', (req, res) => {
      
    const id = req.params.id
  
    const sql = `SELECT * FROM funcionario where id = ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const prod = data[0]
        res.render('edit_func', { layout: false, prod } )
  
    })
  })
  
  //rota de edicao do registro com post - funcionário (wesley)
  app.post('/func/updatefunc', (req, res) => {
  
    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const cargo = req.body.cargo
    
    const sql = `UPDATE funcionario SET nome = '${nome}', cpf = '${cpf}', cargo = '${cargo}' WHERE id = '${id}'` 
  
    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/func')
    })
  
  })
  
  //rota para deletar um registro - funcionário (wesley)
  app.get('/func/remove/:id', (req, res) => {
    const id = req.params.id
  
    const sql = `DELETE FROM funcionario WHERE id = ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/func')
    })
  })

  //rota para inserir dados empresa (maicon)
app.post('/emp/insertemp', (req, res) => {
  const cnpj = req.body.cnpj
  const nomeempresa = req.body.nomeempresa
  const telefone = req.body.telefone
  const localidade = req.body.localidade

  const sql = `INSERT INTO empresas (cnpj, nomeempresa, telefone, localidade) VALUES ('${cnpj}', '${nomeempresa}', '${telefone}', '${localidade}')`

  conn.query(sql, function(err){
      if (err){
          console.log(err)
      }

      res.redirect('/')
  })
})

  //rota de consulta geral empresa (maicon)
  app.get('/emp', (req, res) => {
    const sql = 'SELECT * FROM empresas'
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    
        const listar = data
        
        console.log(listar)
  
        res.render('emp', { layout: false, listar })
  
    })
  })

    // consulta um registo pelo cnpj - empresas (maicon)
    app.get('/emp/:cnpj', (req, res) => {
      const cnpj = req.params.cnpj
      
      const sql = `SELECT * FROM empresas WHERE cnpj = ${cnpj}`
    
      conn.query(sql, function(err, data){
          if(err){
              console.log(err)
              return
          }
    
          const listar = data[0]
          res.render('empresa', {  layout: false, listar } )
    
      })
    })

    //rota do buscar - empresas (maicon)
    app.get('/busca_emp', (req, res) => {
      res.render('busca_emp', { layout: false })
    })

    //rota busc para exibir o resultado do buscar - empresas (maicon)
    app.post('/busc_emp/', (req, res) => {
      const cnpj = req.body.cnpj
      const sql = `SELECT * FROM empresas WHERE cnpj = '${cnpj}'`
    
      conn.query(sql, function(err, data){
        if(err){
        console.log(err)
          return
        }
        const listar = data
        res.render('busc_emp', {  layout: false, listar } )
        })
      })

    //pegando para editar registro - empresas (maicon)
      app.get('/emp/edit/:cnpj', (req, res) => {
          
        const cnpj = req.params.cnpj
      
        const sql = `SELECT * FROM empresas where cnpj = ${cnpj}`
      
        conn.query(sql, function(err, data){
            if(err){
                console.log(err)
                return
            }
      
            const emp = data[0]
            res.render('edit_emp', { layout: false, emp } )
      
        })
      })
    
    //rota de edicao do registro com post - empresas (maicon)
      app.post('/emp/updateemp', (req, res) => {
      
        const cnpj = req.body.cnpj
        const nomeempresa = req.body.nomeempresa
        const telefone = req.body.telefone
        const localidade = req.body.localidade
        
        const sql = `UPDATE empresas SET nomeempresa = '${nomeempresa}', telefone = '${telefone}', localidade = ${localidade} WHERE cnpj = '${cnpj}'` 
      
        conn.query(sql, function(err) {
            if(err){
                console.log(err)
                return
            }
      
            res.redirect('/emp')
        })
      
      })

    //rota para deletar um registro - empresas (maicon)
      app.get('/emp/remove/:cnpj', (req, res) => {
        const cnpj = req.params.cnpj
      
        const sql = `DELETE FROM empresas WHERE cnpj = ${cnpj}`
      
        conn.query(sql, function(err, data){
            if(err){
                console.log(err)
                return
            }
      
            res.redirect('/emp')
        })
      })

    // conexao banco de dados
const conn = mysql.createConnection({
    host: 'localhost',    
    port: '3307',
    user:'root',
    password: '',
    database: 'locadora_carros'
    
    })
    
    conn.connect(function(err) {
    if(err){
        console.log(err)
    }
    
    console.log('Conectado com sucesso!')
    
    
    })
    //configurar o servidor
    
    app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
    
    })