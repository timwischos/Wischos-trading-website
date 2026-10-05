SELECT
  path.set_name,
  path.new_anchor,
  path.current_skus,
  path.story
FROM (
  VALUES
    ('Travel Hardware Set', '行李牌＋包袋挂钩', 'WP-310钛合金钥匙胶囊', '识别行李、安放随身包、收纳小件'),
    ('Wired Desk Set', '配重式理线座', 'WP-201铝鼠标垫＋WP-208设备支架', '屏幕、鼠标与充电线的固定工作台'),
    ('After-Dark Field Set', 'AAA铝合金手电', 'WP-103不锈钢工具笔＋WP-305迷你工具', '现场记录、照明和轻型处理'),
    ('Arrival Tray Set', '模块化落物托盘', 'WP-301门禁钱包＋WP-302钥匙整理器', '到达办公桌或家中后的固定归位'),
    ('Personal Travel Set', '眼镜盒＋随身镜', 'WP-304钛梳或WP-310胶囊', '保护眼镜并整理个人随身用品')
) AS path(set_name, new_anchor, current_skus, story)
ORDER BY path.set_name ASC;
