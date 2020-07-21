import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            count: 0,
            crosses: 0,
            toe: 0,
            isGameOver: false,
        };
        this.winnerLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
    }

    isWinner = () => {
        let s = (this.state.count % 2 === 0) ? 'X' : 'O';
        for (let i = 0; i < this.winnerLine.length; i++) {
            let line = this.winnerLine[i];
            if (this.state.squares[line[0]] === s
                && this.state.squares[line[1]] === s
                && this.state.squares[line[2]] === s) {
                alert(s + ` win`);
                this.setState({isGameOver: true});

                //Выделение цветом победной линии
                let wData = document.querySelectorAll('.ttt-grid');
                for (let i = 0; i < wData.length; i++) {
                    if (i === line[0] || i === line[1] || i === line[2]) {
                        wData[i].classList.add('active');
                    }
                }

                //Изменение счета после сыгранной партии
                if (s === 'X') {
                    this.setState({crosses: this.state.crosses + 1});
                } else {
                    this.setState({toe: this.state.toe + 1});
                }
            }
        }
    };

    resetWinLine = () => {
        let wData = document.querySelectorAll('.active');
        for (let i = 0; i < wData.length; i++) {
            wData[i].classList.remove('active');
        }
    };

    isDraw = () => {
        if (this.state.squares.includes(null) === false
            && this.state.isGameOver === false) {
            alert('Ничья');
            this.setState({isGameOver: true});
        }
    };

    playAgain = () => {
        this.setState({squares: Array(9).fill(null)});
        if (document.querySelector('select').value === '1') {
            this.setState({count: 0});
        } else if (document.querySelector('select').value === '2') {
            this.setState({count: 1});
        }
        this.setState({isGameOver: false});
        this.resetWinLine();
    };

    clickHandler = event => {
        if (this.state.isGameOver === true) {
            alert('Нажми "Играть заново"');
        } else {
            // data - номер квадрата по которому кликнули
            let data = event.target.getAttribute('data');
            let currentSquares = this.state.squares;
            if (currentSquares[data] === null) {
                currentSquares[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
                this.setState({count: this.state.count + 1});
                this.setState({squares: currentSquares});
            } else {
                alert('Сделайте ход в другую клетку!!!');
            }
            this.isWinner();
            setTimeout(() => {
                this.isDraw();
            });
        }
    };

    render() {
        return (
            <div className="container">

                <div className="row justify-content-between scores mx-auto mt-4 ">
                    <div>
                        <div className="score crosses">{this.state.crosses}</div>
                        <div className="label-crosses">Крестики</div>
                    </div>
                    <div>
                        <div className="score toe">{this.state.toe}</div>
                        <div className="label-toe">Нолики</div>
                    </div>
                </div>

                <div className="tic-tac-toe">
                    {this.state.squares.map((square, i) => {
                        return (
                            <div className="ttt-grid" onClick={this.clickHandler} data={i}
                                 key={i}>{square}</div>
                        )
                    })}
                </div>

                <div className="mx-auto row justify-content-center select">
                    <label htmlFor="first-step">Первый ход:</label>
                    <select onChange={this.playAgain} className="custom-select" id="first-step">
                        <option value="1">Крестики</option>
                        <option value="2">Нолики</option>
                    </select>
                    <button className='btn-outline-secondary d-block mx-auto m-1' onClick={this.playAgain}>Играть
                        заново
                    </button>
                </div>
            </div>
        );
    }
}

export default App;







