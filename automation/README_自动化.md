# 思维模型库 · 自动化说明

## 在跑什么
- **每日 09:00 — 收集代理**：联网找 ≤1 个够格的新模型，过「贝叶斯准入 + 双向辩护」，以**特例**身份写入 `思维模型库.js` 的待审区；找不到就坦然空手而归。产出报告 `automation/reports/daily-*.md`。
- **每周日 09:30 — 剪枝代理**：只读不改，输出剪枝/升级建议 `automation/reports/prune-*.md`（删冗余、升够格的特例、机制自检）。
- 两者都**只在你电脑开机/登录时**运行（你选的本机模式）。

## 你的日常动作（每天约 2 分钟）
1. 看 `reports/daily-<日期>.md`：决定那个候选**升核心**（把它的 `status:"candidate"` 改成 `"core"`）还是**删掉**。
2. **每次真用到某个模型**，就给它的 `proven_domains` 记一笔——这是「通用靠挣」唯一可信的证据来源。
3. 每周看一次 `prune-*.md`，按建议手动删 / 并 / 升。

## 控制定时任务（PowerShell）
| 操作 | 命令 |
|---|---|
| 查看状态 | `Get-ScheduledTask -TaskName ThinkingModels-*` |
| 立即跑一次 | `Start-ScheduledTask -TaskName ThinkingModels-Daily` |
| 暂停 | `Disable-ScheduledTask -TaskName ThinkingModels-Daily` |
| 恢复 | `Enable-ScheduledTask -TaskName ThinkingModels-Daily` |
| 删除 | `Unregister-ScheduledTask -TaskName ThinkingModels-Daily -Confirm:$false` |
| 改时间 | 打开「任务计划程序」GUI 改触发器 |

## 安全机制（写崩也不怕）
- 每次运行**先备份**到 `automation/backups/`，跑完**校验 JS 语法**，坏了**自动还原**备份。
- 代理**只能往待审区追加**，绝不改核心模型、绝不动 categories / 维度数组。
- 失败**自动重试一次**；网络抖动最多丢一天，不污染库。

## 鉴权
- 用长期令牌 `CLAUDE_CODE_OAUTH_TOKEN`（已设为用户环境变量，脚本运行时自动加载）。
- 若哪天日志报 401（令牌过期），重跑根目录的 `接通令牌_双击运行.cmd` 即可刷新。

## 想调整
- 收得松 / 紧：改 `automation/daily-agent.md` 里的阈值（缓冲 ≤12、每日 ≤1、三道闸等）。
- 换模型 / 省成本：改 `run-daily.ps1`、`run-weekly.ps1` 里的 `--model sonnet`。
- 收集节奏（效率约束）：`daily-agent.md` 顶部「效率约束」段（≤3 次检索、~5 分钟）。

## 文件地图
```
思维模型库.js              ← 单一真相源（数据）
顶级思维模型_网络版.html    ← 主视图（星系 / ANN / 推荐器）
顶级思维模型_树状网络.html  ← 树状视图 + 覆盖度地图
automation/
  daily-agent.md / weekly-agent.md   ← 两个代理的提示词
  run-daily.ps1 / run-weekly.ps1     ← 带备份/校验/重试的包装脚本
  机制说明.md / 拒绝档案.md           ← 防伪通用化机制 + 反幸存者偏差
  reports/   ← 代理每天/每周的产出
  logs/ backups/   ← 运行日志 / 自动备份（保留最近30份）
```
