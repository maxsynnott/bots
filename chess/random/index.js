const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/move', (req, res) => {
	const { Chess } = require('chess.js');
	const chess = new Chess(req.body.fen);

	const moves = chess.moves()
  const move = moves[Math.floor(Math.random() * moves.length)]

  res.json({
  	move: move
  })
})

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err)
})

// Error handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
	})
})

const port = process.env.PORT || 2687

app.listen(port, () => {
  console.log('Server listening at port ' + port)
})
