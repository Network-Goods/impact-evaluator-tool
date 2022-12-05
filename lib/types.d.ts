export interface Evaluation {
	id: string;
	title: string;
	kind: 'undefined' | 'quadratic-voting' | 'quantitative-evaluation';
	status: 'draft' | 'started' | 'closed';
}