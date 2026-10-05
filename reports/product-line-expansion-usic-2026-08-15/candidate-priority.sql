SELECT
  candidate.product,
  candidate.chart_label,
  candidate.useful,
  candidate.interesting,
  candidate.substantial,
  candidate.cohesive,
  candidate.market,
  candidate.deductions,
  candidate.priority,
  candidate.phase
FROM (
  VALUES
    ('配重式金属理线座', '理线座', 5, 4, 5, 5, 5, 1, 23, '第一轮'),
    ('AAA铝合金手电', 'AAA手电', 5, 4, 4, 5, 5, 1, 22, '第一轮'),
    ('隐私铝合金行李牌', '行李牌', 5, 3, 4, 5, 5, 1, 21, '第一轮'),
    ('折叠金属包袋挂钩', '包袋挂钩', 4, 5, 4, 5, 4, 1, 21, '第一轮'),
    ('模块化金属落物托盘', '落物托盘', 4, 4, 5, 5, 4, 2, 20, '第二轮'),
    ('金属卷尺', '金属卷尺', 5, 3, 4, 5, 4, 2, 19, '第二轮'),
    ('铝合金眼镜盒', '眼镜盒', 4, 3, 5, 4, 4, 1, 19, '第二轮'),
    ('不锈钢随身镜＋滑套', '随身镜', 4, 3, 4, 4, 4, 1, 18, '第二轮')
) AS candidate(
  product,
  chart_label,
  useful,
  interesting,
  substantial,
  cohesive,
  market,
  deductions,
  priority,
  phase
)
ORDER BY candidate.priority DESC, candidate.product ASC;
