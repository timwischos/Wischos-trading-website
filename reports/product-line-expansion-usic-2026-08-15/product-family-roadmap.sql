SELECT
  roadmap.sequence,
  roadmap.family,
  roadmap.products,
  roadmap.buyer,
  roadmap.existing_pairing
FROM (
  VALUES
    (1, 'Work Surface', '配重式理线座；模块化落物托盘', '混合办公、科技、入职和管理层礼赠', 'WP-201鼠标垫、WP-208设备支架、WP-301门禁钱包'),
    (2, 'Travel Hardware', '隐私行李牌；折叠包袋/公文包挂钩', '差旅、航空、咨询、销售、酒店和会议', 'WP-310钥匙胶囊、WP-401保温瓶、WP-309名片盒'),
    (3, 'Field Utility', 'AAA铝合金手电；金属卷尺', '建筑、物业、仓储、采矿、维修和现场服务', 'WP-103工具笔、WP-104多功能笔、WP-305迷你工具'),
    (4, 'Personal Carry', '铝合金眼镜盒；不锈钢随身镜', '医疗、保险、美容、旅行和更广泛的员工群体', 'WP-304钛梳、WP-310胶囊、WP-106黄铜笔')
) AS roadmap(sequence, family, products, buyer, existing_pairing)
ORDER BY roadmap.sequence ASC;
