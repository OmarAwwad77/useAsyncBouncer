import React from 'react';

export const useBouncer = (fn: Function, delay: number) => {
	const latestTimeOutRef = React.useRef<NodeJS.Timeout>();
	const timeOutRef = React.useRef<NodeJS.Timeout>();

	const debounce = React.useCallback(
		(...args: any[]) => {
			return new Promise<any>((res, rej) => {
				if (timeOutRef.current) {
					clearTimeout(timeOutRef.current);
				}
				const timeOut = setTimeout(async () => {
					try {
						const serverResponse = await fn(...args);
						if (timeOut === latestTimeOutRef.current) {
							res(serverResponse);
						} else {
							console.log(`%cQuery for "${args[0]}" is cancel`, 'color: red');
						}
					} catch (error) {
						if (timeOut === latestTimeOutRef.current) {
							rej(error);
						} else {
							console.log(`%cQuery for "${args[0]}" is cancel`, 'color: red');
						}
					}
					timeOutRef.current = undefined;
				}, delay);
				latestTimeOutRef.current = timeOut;
				timeOutRef.current = timeOut;
			});
		},
		[delay, fn]
	);

	return debounce;
};
