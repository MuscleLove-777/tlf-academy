/* ============================================
   TLF Academy - Level 11: RによるTLFプログラミング入門
   ============================================ */

const LEVEL11_DATA = {
    id: 11,
    title: "RによるTLFプログラミング入門",
    icon: "🔬",
    description: "Rとpharmaverseエコシステムを活用した臨床試験TLF作成手法を学ぶ",
    modules: [
        {
            id: 1101,
            title: "pharmaverseエコシステム概要",
            duration: "25分",
            content: `
<h2>pharmaverseとは</h2>
<p><strong>pharmaverse</strong>は、臨床試験データの処理・解析・報告のためのRパッケージ群を統合するオープンソースエコシステムです。製薬企業・CRO・規制当局が協力して開発・維持しており、SAS中心だった臨床試験プログラミングをRで実現することを目指しています。</p>

<h2>主要パッケージ</h2>
<table>
<thead>
<tr><th>パッケージ</th><th>用途</th><th>SAS相当</th></tr>
</thead>
<tbody>
<tr><td><strong>admiral</strong></td><td>ADaMデータセット作成</td><td>ADaMマッピングプログラム</td></tr>
<tr><td><strong>rtables</strong></td><td>臨床試験の表作成</td><td>PROC REPORT</td></tr>
<tr><td><strong>tern</strong></td><td>rtablesの臨床統計拡張</td><td>統計マクロ群</td></tr>
<tr><td><strong>teal</strong></td><td>対話型Shinyアプリ</td><td>JMP / SAS VA相当</td></tr>
<tr><td><strong>chevron</strong></td><td>標準TLFテンプレート</td><td>TLFマクロライブラリ</td></tr>
<tr><td><strong>rlistings</strong></td><td>Listing出力</td><td>PROC REPORT (Listing)</td></tr>
<tr><td><strong>formatters</strong></td><td>表の書式設定</td><td>SAS FORMAT</td></tr>
</tbody>
</table>

<h2>pharmaverseのワークフロー</h2>
<ol>
<li><strong>データ読み込み</strong>：haven::read_xpt() でXPTファイルを読み込み</li>
<li><strong>ADaM作成</strong>：admiralパッケージでADSL, ADAE, ADLB等を作成</li>
<li><strong>TLF作成</strong>：rtables / tern / chevronで表・図・リストを作成</li>
<li><strong>出力</strong>：PDF / RTF / HTMLに出力</li>
</ol>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r"># pharmaverseパッケージのインストール
install.packages("pharmaverseadam")  # サンプルADaMデータ
install.packages("rtables")
install.packages("tern")
install.packages("rlistings")
install.packages("chevron")

# データの読み込み
library(haven)
adsl <- read_xpt("path/to/adsl.xpt")
adae <- read_xpt("path/to/adae.xpt")</code></pre>
</div>

<h2>tealによる対話型探索</h2>
<p><strong>teal</strong>はShinyベースの対話型アプリケーションフレームワークで、臨床データの探索・可視化に使用されます。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r">library(teal)
library(teal.modules.clinical)

app <- init(
  data = teal_data(
    ADSL = pharmaverseadam::adsl,
    ADAE = pharmaverseadam::adae
  ),
  modules = modules(
    tm_t_summary(
      label = "Demographics Table",
      dataname = "ADSL",
      arm_var = choices_selected("ARM", "ARM"),
      summarize_vars = choices_selected(
        c("AGE", "SEX", "RACE"),
        c("AGE", "SEX")
      )
    )
  )
)

shinyApp(app$ui, app$server)</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 SASからRへの移行</div>
FDAは2023年にR言語でのデータ提出を受け入れる方針を明確にしました。R Consortium のR Submissions Working Groupが、FDAへのRベース提出のパイロットプログラムを実施しています。今後、Rによる臨床試験プログラミングの需要は増加が見込まれます。
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ バリデーションの重要性</div>
規制当局への提出に使用するRパッケージは、バリデーション済みであることが求められます。{renv}によるパッケージバージョン管理、{valtools}によるバリデーション文書の作成が推奨されます。
</div>
`,
            quiz: [
                { id: "q1101_1", type: "choice", question: "pharmaverseでADaMデータセット作成に使用されるパッケージはどれですか？", options: ["rtables", "admiral", "teal", "chevron"], answer: 1, explanation: "admiralパッケージは、ADaMデータセット（ADSL, ADAE, ADLB等）の作成に特化したpharmaverseのパッケージです。" },
                { id: "q1101_2", type: "choice", question: "SASのPROC REPORTに相当するRパッケージはどれですか？", options: ["tern", "rlistings", "rtables", "formatters"], answer: 2, explanation: "rtablesパッケージは、SASのPROC REPORTに相当する機能を提供し、臨床試験の表作成に使用されます。" },
                { id: "q1101_3", type: "choice", question: "XPTファイルをRで読み込むために使用する関数はどれですか？", options: ["read.csv()", "read_sas()", "read_xpt()", "load()"], answer: 2, explanation: "havenパッケージのread_xpt()関数を使用して、SAS Transport形式（XPT）のファイルを読み込みます。" },
                { id: "q1101_4", type: "choice", question: "pharmaverseで標準TLFテンプレートを提供するパッケージはどれですか？", options: ["tern", "chevron", "rtables", "teal"], answer: 1, explanation: "chevronパッケージは、臨床試験でよく使用される標準的なTLFテンプレートを提供します。" },
                { id: "q1101_5", type: "fill", question: "Rパッケージのバージョン管理と再現性確保に使用されるパッケージは ___ です。", answer: "renv", explanation: "renvパッケージは、プロジェクト固有のRパッケージ環境を管理し、再現性のある解析環境を構築するために使用されます。" }
            ]
        },
        {
            id: 1102,
            title: "rtablesによる表作成",
            duration: "30分",
            content: `
<h2>rtablesの基本概念</h2>
<p><strong>rtables</strong>は、Roche社が開発した臨床試験の表作成パッケージです。行と列の分割（split）と解析関数（analyze）を組み合わせて、複雑な階層構造を持つ表を作成できます。</p>

<h2>basic_table()による表作成</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r">library(rtables)

# 基本的な人口統計表
lyt <- basic_table(
  title = "Table 14.1.1",
  subtitles = "Summary of Demographics",
  main_footer = "Source: adsl",
  prov_footer = "Program: t_14_1_1.R"
) |>
  split_cols_by("ARM") |>
  add_colcounts() |>
  analyze("AGE", afun = mean, format = "xx.x") |>
  analyze("AGE", afun = sd, format = "xx.xx",
          show_labels = "hidden") |>
  analyze("SEX", afun = s_count_values)

tbl <- build_table(lyt, df = adsl)
tbl</code></pre>
</div>

<h2>split関数</h2>
<p>rtablesでは列と行の分割関数を使って表構造を定義します。</p>

<table>
<thead>
<tr><th>関数</th><th>説明</th><th>SAS相当</th></tr>
</thead>
<tbody>
<tr><td><code>split_cols_by()</code></td><td>列を変数の値で分割</td><td>DEFINE / ACROSS</td></tr>
<tr><td><code>split_cols_by_multivar()</code></td><td>複数変数で列分割</td><td>複数ACROSS変数</td></tr>
<tr><td><code>split_rows_by()</code></td><td>行を変数の値で分割</td><td>DEFINE / GROUP</td></tr>
<tr><td><code>split_rows_by_multivar()</code></td><td>複数変数で行分割</td><td>複数GROUP変数</td></tr>
<tr><td><code>add_colcounts()</code></td><td>列ヘッダーにNを追加</td><td>Big N表示</td></tr>
<tr><td><code>add_overall_col()</code></td><td>Total列を追加</td><td>ALL列の追加</td></tr>
</tbody>
</table>

<h2>analyze()関数</h2>
<p>analyze()は各セルに適用する統計量の計算関数を指定します。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r"># カスタム解析関数
s_summary <- function(x, .N_col) {
  in_rows(
    "n"           = rcell(length(x), format = "xx"),
    "Mean (SD)"   = rcell(c(mean(x), sd(x)), format = "xx.x (xx.xx)"),
    "Median"      = rcell(median(x), format = "xx.x"),
    "Q1, Q3"      = rcell(c(quantile(x, 0.25), quantile(x, 0.75)),
                          format = "xx.x, xx.x"),
    "Min, Max"    = rcell(c(min(x), max(x)), format = "xx.x, xx.x"),
    "Missing"     = rcell(sum(is.na(x)), format = "xx")
  )
}

lyt <- basic_table() |>
  split_cols_by("ARM") |>
  add_colcounts() |>
  analyze("AGE", afun = s_summary)

tbl <- build_table(lyt, df = adsl)</code></pre>
</div>

<h2>formatの指定</h2>
<p>rtablesでは独自のフォーマット文字列で出力形式を制御します。</p>

<table>
<thead>
<tr><th>フォーマット</th><th>説明</th><th>出力例</th></tr>
</thead>
<tbody>
<tr><td><code>"xx"</code></td><td>整数</td><td>42</td></tr>
<tr><td><code>"xx.x"</code></td><td>小数1桁</td><td>42.3</td></tr>
<tr><td><code>"xx.xx"</code></td><td>小数2桁</td><td>42.35</td></tr>
<tr><td><code>"xx.x (xx.xx)"</code></td><td>Mean (SD)</td><td>42.3 (12.45)</td></tr>
<tr><td><code>"xx (xx.x%)"</code></td><td>n (%)</td><td>15 (34.5%)</td></tr>
<tr><td><code>"xx.x, xx.x"</code></td><td>範囲</td><td>18.0, 85.0</td></tr>
</tbody>
</table>

<h2>表の出力</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r"># テキスト出力（コンソール/TXT）
toString(tbl)

# RTF出力
export_as_rtf(tbl, file = "T_14_1_1.rtf",
              landscape = TRUE,
              font_size = 9)

# PDF出力
export_as_pdf(tbl, file = "T_14_1_1.pdf",
              landscape = TRUE,
              font_size = 9)

# DOCX出力
export_as_docx(tbl, file = "T_14_1_1.docx")</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 ternパッケージの活用</div>
ternパッケージは、rtablesの上に構築された臨床統計関数のライブラリです。人口統計、AE要約、Lab異常値など、標準的な臨床表の解析関数があらかじめ用意されています。
<ul>
<li><code>s_summary()</code> - 連続変数の記述統計</li>
<li><code>count_occurrences()</code> - AEの発現数集計</li>
<li><code>analyze_vars()</code> - 変数の自動解析</li>
<li><code>estimate_incidence_rate()</code> - 発現率の推定</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ SASとの出力比較</div>
Rで作成したTLFはSASの出力と数値的に一致することが必要です。丸め方法の違い（RはIEEE 754、SASはBanker's rounding）に注意し、PROC COMPAREに相当する検証プロセスを実施してください。
</div>
`,
            quiz: [
                { id: "q1102_1", type: "choice", question: "rtablesで表作成を開始するための関数はどれですか？", options: ["create_table()", "basic_table()", "new_table()", "init_table()"], answer: 1, explanation: "basic_table()関数でレイアウトの定義を開始し、パイプ演算子で列分割・行分割・解析関数を追加していきます。" },
                { id: "q1102_2", type: "choice", question: "rtablesで列ヘッダーにBig N（被験者数）を表示するための関数はどれですか？", options: ["add_big_n()", "add_colcounts()", "show_n()", "header_n()"], answer: 1, explanation: "add_colcounts()関数を使用すると、各列のヘッダーに被験者数（N=xx）が自動的に追加されます。" },
                { id: "q1102_3", type: "choice", question: "rtablesでMean (SD)を「42.3 (12.45)」の形式で表示するフォーマット文字列はどれですか？", options: ["\"xx.x / xx.xx\"", "\"xx.x (xx.xx)\"", "\"mean.1 (sd.2)\"", "\"%5.1f (%6.2f)\""], answer: 1, explanation: "rtablesでは \"xx.x (xx.xx)\" のような独自のフォーマット文字列を使用し、小数点以下の桁数は 'x' の数で制御します。" },
                { id: "q1102_4", type: "choice", question: "rtablesで定義したレイアウトにデータを適用して実際の表を作成する関数はどれですか？", options: ["render_table()", "make_table()", "build_table()", "generate_table()"], answer: 2, explanation: "build_table(layout, df)関数で、定義したレイアウトにデータフレームを適用して表オブジェクトを生成します。" },
                { id: "q1102_5", type: "fill", question: "rtablesで投与群ごとに列を分割する関数は split_cols_by('___') です（ARM変数の場合）。", answer: "ARM", explanation: "split_cols_by('ARM') で、ARM変数の値ごとに列を分割し、投与群別の表が作成されます。" }
            ]
        },
        {
            id: 1103,
            title: "ggplot2による臨床試験グラフ",
            duration: "30分",
            content: `
<h2>臨床試験で使用される主要グラフ</h2>
<p>臨床試験のFigure（図）は、有効性・安全性の結果を視覚的に示すために不可欠です。Rの<strong>ggplot2</strong>と関連パッケージを使用して、規制当局向けの高品質なグラフを作成します。</p>

<table>
<thead>
<tr><th>グラフタイプ</th><th>用途</th><th>主要パッケージ</th></tr>
</thead>
<tbody>
<tr><td>Kaplan-Meier曲線</td><td>生存時間解析</td><td>survminer + survival</td></tr>
<tr><td>Forest Plot</td><td>サブグループ解析・メタアナリシス</td><td>ggplot2 + forestploter</td></tr>
<tr><td>箱ひげ図</td><td>連続変数の分布比較</td><td>ggplot2</td></tr>
<tr><td>スパゲティプロット</td><td>個別被験者の推移</td><td>ggplot2</td></tr>
<tr><td>ウォーターフォールプロット</td><td>腫瘍縮小効果</td><td>ggplot2</td></tr>
<tr><td>スイマーレーンプロット</td><td>治療期間と奏効</td><td>ggplot2</td></tr>
</tbody>
</table>

<h2>Kaplan-Meier曲線</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r">library(survival)
library(survminer)

# 生存曲線の推定
fit <- survfit(Surv(AVAL, CNSR == 0) ~ ARM,
               data = adtte)

# Kaplan-Meier曲線の描画
ggsurvplot(fit,
  data = adtte,
  risk.table = TRUE,        # リスクテーブル表示
  risk.table.height = 0.3,  # リスクテーブルの高さ
  pval = TRUE,              # p値表示
  conf.int = TRUE,          # 信頼区間
  xlab = "Time (Months)",
  ylab = "Survival Probability",
  title = "Figure 14.2.1: Kaplan-Meier Plot of Overall Survival",
  legend.title = "Treatment",
  legend.labs = c("Placebo", "Drug A"),
  palette = c("#2E86AB", "#A23B72"),
  break.time.by = 6,        # X軸の目盛り間隔
  surv.median.line = "hv",  # 中央値の線
  ggtheme = theme_classic(),
  tables.theme = theme_cleantable()
)</code></pre>
</div>

<h2>Forest Plot</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r">library(ggplot2)

# サブグループ解析の結果データ
forest_data <- data.frame(
  subgroup = c("Overall", "Age <65", "Age >=65",
               "Male", "Female", "ECOG 0", "ECOG 1"),
  hr = c(0.72, 0.68, 0.79, 0.70, 0.75, 0.65, 0.82),
  lower = c(0.58, 0.48, 0.58, 0.52, 0.54, 0.45, 0.60),
  upper = c(0.89, 0.96, 1.08, 0.94, 1.04, 0.94, 1.12),
  n = c(500, 280, 220, 300, 200, 250, 250)
)

ggplot(forest_data, aes(x = hr, y = reorder(subgroup, rev(seq_along(subgroup))))) +
  geom_point(size = 3) +
  geom_errorbarh(aes(xmin = lower, xmax = upper), height = 0.2) +
  geom_vline(xintercept = 1, linetype = "dashed", color = "red") +
  scale_x_log10(breaks = c(0.5, 0.75, 1.0, 1.5)) +
  labs(
    title = "Figure 14.2.2: Forest Plot of Hazard Ratios by Subgroup",
    x = "Hazard Ratio (95% CI)",
    y = ""
  ) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 11, face = "bold"),
    panel.grid.minor = element_blank()
  )</code></pre>
</div>

<h2>箱ひげ図（臨床検査値）</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r"># 来院別・投与群別の臨床検査値
ggplot(adlb %>% filter(PARAMCD == "ALT"),
       aes(x = factor(AVISITN), y = AVAL, fill = ARM)) +
  geom_boxplot(outlier.shape = 1, position = position_dodge(0.8)) +
  stat_summary(fun = mean, geom = "point", shape = 18, size = 3,
               position = position_dodge(0.8)) +
  labs(
    title = "Figure 14.3.1: Box Plot of ALT by Visit and Treatment",
    x = "Visit",
    y = "ALT (U/L)",
    fill = "Treatment"
  ) +
  scale_x_discrete(labels = c("BL", "W2", "W4", "W8", "W12", "W24")) +
  geom_hline(yintercept = 40, linetype = "dotted",
             color = "red", linewidth = 0.5) +
  annotate("text", x = 0.5, y = 42, label = "ULN",
           color = "red", hjust = 0, size = 3) +
  theme_classic() +
  theme(legend.position = "bottom")</code></pre>
</div>

<h2>グラフの保存</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r"># PDF出力（規制当局提出用）
ggsave("F_14_2_1.pdf", plot = km_plot,
       width = 11, height = 8.5, units = "in",
       dpi = 300)

# PNG出力（プレゼン・レポート用）
ggsave("F_14_2_1.png", plot = km_plot,
       width = 11, height = 8.5, units = "in",
       dpi = 300)

# 複数グラフの一括出力
library(patchwork)
combined <- plot1 + plot2 + plot_layout(ncol = 2)
ggsave("F_combined.pdf", combined,
       width = 16, height = 8, units = "in")</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 臨床グラフの品質基準</div>
<ul>
<li>フォントサイズは最低8pt以上（FDAガイダンス）</li>
<li>白黒印刷でも判別できるよう、色だけでなく線種やマーカーも変える</li>
<li>解像度は300dpi以上</li>
<li>軸ラベル・凡例・タイトルは簡潔かつ正確に</li>
<li>リスクテーブル（KM曲線の場合）は必須</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ グラフ作成の注意点</div>
<ul>
<li>Y軸の範囲を恣意的に変更して効果を誇張しない</li>
<li>信頼区間は必ず表示する</li>
<li>データカットオフ日を明記する</li>
<li>カラーパレットはカラーユニバーサルデザインを考慮する</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1103_1", type: "choice", question: "Kaplan-Meier曲線の描画にリスクテーブルを追加するためのggsurvplotオプションはどれですか？", options: ["number.at.risk = TRUE", "risk.table = TRUE", "add.risk = TRUE", "show.nrisk = TRUE"], answer: 1, explanation: "ggsurvplot()のrisk.table = TRUEオプションで、KM曲線の下にリスクテーブル（各時点でのat-risk数）を表示できます。" },
                { id: "q1103_2", type: "choice", question: "Forest Plotでハザード比=1の参照線を追加するggplot2関数はどれですか？", options: ["geom_abline()", "geom_vline()", "geom_hline()", "geom_segment()"], answer: 1, explanation: "Forest Plotでは横軸がハザード比のため、geom_vline(xintercept = 1)で垂直の参照線を追加します。" },
                { id: "q1103_3", type: "choice", question: "ggplot2でグラフをPDFファイルに保存する関数はどれですか？", options: ["save_plot()", "export_graph()", "ggsave()", "write_plot()"], answer: 2, explanation: "ggsave()関数でggplot2のグラフオブジェクトをPDF、PNG、SVGなどの形式で保存します。" },
                { id: "q1103_4", type: "choice", question: "臨床試験グラフで求められる最低解像度はどれですか？", options: ["72dpi", "150dpi", "300dpi", "600dpi"], answer: 2, explanation: "FDAのガイダンスでは300dpi以上の解像度が推奨されています。印刷物の品質を確保するために重要です。" },
                { id: "q1103_5", type: "fill", question: "Rで生存時間解析のKM曲線を簡単に描画できるパッケージは ___ です。", answer: "survminer", explanation: "survminerパッケージは、survivalパッケージの結果をggplot2ベースで美しく描画するための関数（ggsurvplot等）を提供します。" }
            ]
        },
        {
            id: 1104,
            title: "R Markdown/Quartoによるレポート",
            duration: "25分",
            content: `
<h2>R Markdownによる臨床レポート</h2>
<p><strong>R Markdown</strong>（および後継の<strong>Quarto</strong>）は、コード・テキスト・出力を一つの文書にまとめるリテラシープログラミングツールです。臨床試験では、再現性のあるTLFレポートの生成に活用されます。</p>

<h2>R Markdownの基本構造</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R Markdown</span>
</div>
<pre><code class="language-r">---
title: "Clinical Study Report Tables"
subtitle: "Protocol ABC-001"
author: "Statistical Programming"
date: "`r Sys.Date()`"
output:
  pdf_document:
    toc: true
    number_sections: true
    latex_engine: xelatex
params:
  study: "ABC-001"
  population: "Safety"
  snapshot_date: "2024-06-15"
---

```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = FALSE, message = FALSE, warning = FALSE)
library(rtables)
library(tern)
library(haven)

adsl <- read_xpt(paste0("data/", params$study, "/adsl.xpt"))
adae <- read_xpt(paste0("data/", params$study, "/adae.xpt"))
```

# Demographics

```{r demographics-table}
lyt <- basic_table(
  title = "Table 14.1.1: Summary of Demographics"
) |>
  split_cols_by("ARM") |>
  add_colcounts() |>
  analyze_vars(c("AGE", "SEX", "RACE"))

build_table(lyt, df = adsl)
```</code></pre>
</div>

<h2>パラメータ化レポート</h2>
<p>R Markdownのparams機能を使って、同一テンプレートから異なる条件のレポートを生成できます。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r"># パラメータを変えて複数レポートを生成
studies <- c("ABC-001", "ABC-002", "XYZ-101")

for (study in studies) {
  rmarkdown::render(
    input = "tlf_report_template.Rmd",
    output_file = paste0("CSR_Tables_", study, ".pdf"),
    params = list(
      study = study,
      population = "Safety",
      snapshot_date = "2024-06-15"
    )
  )
}</code></pre>
</div>

<h2>Quartoの特徴</h2>
<p><strong>Quarto</strong>はR Markdownの後継であり、R・Python・Julia等の複数言語に対応した次世代のドキュメントシステムです。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">Quarto</span>
</div>
<pre><code class="language-r">---
title: "Clinical Study Report"
format:
  pdf:
    documentclass: article
    papersize: letter
    geometry:
      - margin=1in
    fontsize: 10pt
  html:
    toc: true
    theme: cosmo
execute:
  echo: false
  warning: false
params:
  study: "ABC-001"
---

## Demographics

```{r}
#| label: tbl-demographics
#| tbl-cap: "Table 14.1.1: Summary of Demographics"

lyt <- basic_table() |>
  split_cols_by("ARM") |>
  add_colcounts() |>
  analyze_vars(c("AGE", "SEX", "RACE"))

build_table(lyt, df = adsl)
```</code></pre>
</div>

<h2>出力形式の比較</h2>
<table>
<thead>
<tr><th>特徴</th><th>PDF</th><th>HTML</th><th>Word/RTF</th></tr>
</thead>
<tbody>
<tr><td>レイアウト固定</td><td>あり</td><td>なし（レスポンシブ）</td><td>あり</td></tr>
<tr><td>規制当局提出</td><td>適合</td><td>条件付き</td><td>RTFのみ</td></tr>
<tr><td>対話性</td><td>なし</td><td>あり</td><td>なし</td></tr>
<tr><td>ページ制御</td><td>精密</td><td>限定的</td><td>中程度</td></tr>
<tr><td>印刷品質</td><td>高い</td><td>中程度</td><td>高い</td></tr>
</tbody>
</table>

<h2>再現性の確保</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">R</span>
</div>
<pre><code class="language-r"># renvによるパッケージ環境の固定
renv::init()       # プロジェクトの初期化
renv::snapshot()   # 現在の環境を記録
renv::restore()    # 記録した環境を復元

# セッション情報の記録
sessionInfo()
# R version 4.3.2
# Platform: x86_64-pc-linux-gnu
# Attached packages: rtables 0.6.5, tern 0.9.3, ...</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 CI/CDパイプラインとの統合</div>
R Markdown/Quartoレポートは、GitHub ActionsやJenkinsなどのCI/CDパイプラインで自動ビルドが可能です：
<ul>
<li>データ更新時にTLFを自動再生成</li>
<li>Gitでレポートのバージョン管理</li>
<li>差分検出による変更箇所の自動確認</li>
<li>品質チェックの自動実行</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ 注意事項</div>
<ul>
<li>PDF出力にはLaTeX環境（tinytex推奨）が必要</li>
<li>日本語を含む場合はXeLaTeXエンジンの使用が推奨される</li>
<li>大量のTLFを1つのRmdにまとめるとビルド時間が長くなるため、分割を検討する</li>
<li>出力サイズが大きい場合はchunk optionsでfig.width/fig.heightを調整</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1104_1", type: "choice", question: "R Markdownでパラメータを定義する場所はどこですか？", options: ["setup chunk内", "YAMLヘッダーのparams:", "本文のテキスト内", "output:セクション内"], answer: 1, explanation: "R MarkdownのYAMLヘッダーにparams:セクションを設け、パラメータのデフォルト値を定義します。rmarkdown::render()時に値を上書きできます。" },
                { id: "q1104_2", type: "choice", question: "R Markdownの後継として開発された、複数言語対応のドキュメントシステムはどれですか？", options: ["Jupyter", "Sweave", "Quarto", "Bookdown"], answer: 2, explanation: "QuartoはR Markdownの後継であり、R・Python・Julia・Observable JSなど複数の言語に対応しています。" },
                { id: "q1104_3", type: "choice", question: "renvパッケージで現在のパッケージ環境を記録するコマンドはどれですか？", options: ["renv::save()", "renv::snapshot()", "renv::freeze()", "renv::record()"], answer: 1, explanation: "renv::snapshot()で現在のプロジェクトで使用されている全パッケージのバージョン情報をrenv.lockファイルに記録します。" },
                { id: "q1104_4", type: "choice", question: "R Markdownで日本語を含むPDFを出力する際に推奨されるLaTeXエンジンはどれですか？", options: ["pdflatex", "lualatex", "xelatex", "platex"], answer: 2, explanation: "XeLaTeXエンジンはUnicode対応が優れており、日本語フォントの取り扱いが容易なため、日本語を含むPDF出力に推奨されます。" },
                { id: "q1104_5", type: "fill", question: "R MarkdownをプログラムでPDFに変換する関数は rmarkdown::___() です。", answer: "render", explanation: "rmarkdown::render()関数で、R MarkdownファイルをPDF・HTML・Wordなどの形式に変換（レンダリング）します。" }
            ]
        }
    ]
};
