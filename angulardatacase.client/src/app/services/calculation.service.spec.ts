import { buildResultRows } from './calculation.service';
import { Analytic, GroupingNode } from '@models';

describe('buildResultRows', () => {
  const nodeNames: GroupingNode[] = [
    { id: 'n1', displayName: 'Node 1' },
    { id: 'n2', displayName: 'Node 2' },
    { id: 'n3', displayName: 'Node 3' },
  ];
  const a1: Analytic = { id: 'A1', displayName: 'Time weighted X' };
  const a2: Analytic = { id: 'A2', displayName: 'Y mean' };

  it('joins node names and merges results from multiple analytics by node id', () => {
    const rows = buildResultRows(nodeNames, [
      { analytic: a1, results: [{ id: 'n1', result: 10 }, { id: 'n2', result: 20 }] },
      { analytic: a2, results: [{ id: 'n1', result: 30 }] },
    ]);

    expect(rows.find((r) => r.nodeId === 'n1')).toEqual({
      nodeId: 'n1',
      nodeName: 'Node 1',
      values: { A1: 10, A2: 30 },
    });
  });

  it('includes only nodes that at least one analytic returned', () => {
    const rows = buildResultRows(nodeNames, [
      { analytic: a1, results: [{ id: 'n1', result: 10 }] },
    ]);

    expect(rows.map((r) => r.nodeId)).toEqual(['n1']); 
  });

  it('leaves a gap when one analytic did not calculate a node', () => {
    const rows = buildResultRows(nodeNames, [
      { analytic: a1, results: [{ id: 'n1', result: 10 }, { id: 'n2', result: 20 }] },
      { analytic: a2, results: [{ id: 'n1', result: 30 }] }, 
    ]);

    const n2 = rows.find((r) => r.nodeId === 'n2')!;
    expect(n2.values['A1']).toBe(20);
    expect(n2.values['A2']).toBeUndefined();
  });

  it('falls back to the node id when no display name is found', () => {
    const rows = buildResultRows([], [
      { analytic: a1, results: [{ id: 'unknown', result: 5 }] },
    ]);

    expect(rows[0].nodeName).toBe('unknown');
  });

  it('returns no rows when there are no results', () => {
    expect(buildResultRows(nodeNames, [])).toEqual([]);
  });
});