import React from 'react';
import './App.css';
import { useBouncer } from './hooks/useBouncer';

const fetchDataFromServer = (query: string) => {
	return new Promise<string>((res, rej) => {
		setTimeout(() => {
			// if (Math.random() > 0.5)
			// 	rej('fetchDataFromServer: NetWork Error (just for testing) ');
			res(query);
		}, 1000 * (5 / query.length));
	});
};

function App() {
	const [word, setWord] = React.useState('');
	const [response, setResponse] = React.useState('');
	const fetchDataFromServerDebounced = useBouncer(fetchDataFromServer, 500);

	React.useEffect(() => {
		fetchDataFromServerDebounced(word).then(
			(res) => setResponse(res),
			(err) => setResponse(err)
		);
	}, [word, fetchDataFromServerDebounced]);

	return (
		<div className='App'>
			<h1>Debouncing async side-effects</h1>

			<input value={word} onChange={(e) => setWord(e.target.value)} />
			<pre>
				<code>
					{JSON.stringify(
						{
							word,
							response,
						},
						null,
						2
					)}
				</code>
			</pre>
		</div>
	);
}

export default App;
