import React from 'react';

export const PrimaryButton = (props) => {
	const {
		id,
		className = '',
		loading = false,
		title = '',
		children,
		minWidth = '74px',
		...buttonProps
	} = props;
	return (
		<button
			className={`btn btn-success ${className}`}
			type='submit'
			id={id}
			title={title}
			style={{
				minWidth: minWidth,
				transition: 'all 0.1s ease',
			}}
			disabled={loading ? true : false}
			{...buttonProps}
		>
			{loading ? (
				<div className='spinner-border text-light' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			) : (
				children
			)}
		</button>
	);
};
