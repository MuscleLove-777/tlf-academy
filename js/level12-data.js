/* ============================================
   TLF Academy - Level 12: 品質管理と検証（QC/Validation）
   ============================================ */

const LEVEL12_DATA = {
    id: 12,
    title: "品質管理と検証（QC/Validation）",
    icon: "✅",
    description: "TLF作成における品質管理・二重プログラミング・検証手法を習得する",
    modules: [
        {
            id: 1201,
            title: "二重プログラミングの手法",
            duration: "25分",
            content: `
<h2>二重プログラミング（Double Programming）とは</h2>
<p><strong>二重プログラミング</strong>は、臨床試験のTLF品質を保証するための最も一般的な検証手法です。一人のプログラマー（Production Programmer）がTLFを作成し、別のプログラマー（QC Programmer）が独立してプログラムを作成し、両者の結果を比較検証します。</p>

<h2>二重プログラミングの役割分担</h2>
<table>
<thead>
<tr><th>役割</th><th>責任</th><th>成果物</th></tr>
</thead>
<tbody>
<tr><td><strong>Production Programmer</strong></td><td>TLFの作成（本番プログラム）</td><td>TLF出力（RTF/PDF）、本番プログラム</td></tr>
<tr><td><strong>QC Programmer</strong></td><td>独立した検証プログラムの作成</td><td>QCデータセット、比較結果レポート</td></tr>
<tr><td><strong>Lead Programmer</strong></td><td>不一致の調査・解決、最終承認</td><td>QC完了記録</td></tr>
</tbody>
</table>

<h2>Independent Programmingの原則</h2>
<ol>
<li><strong>独立性</strong>：QCプログラマーはProduction Programmerのコードを見ずにプログラムを作成する</li>
<li><strong>同一仕様</strong>：両者は同じSAP（Statistical Analysis Plan）とTLFシェルに基づいて作業する</li>
<li><strong>同一データ</strong>：同じ入力データセット（ADaMデータセット）を使用する</li>
<li><strong>異なるアプローチ</strong>：可能であれば異なるプログラミング手法を使用する</li>
</ol>

<div class="info-box tip">
<div class="info-box-title">💡 QCの範囲</div>
二重プログラミングの範囲は企業のSOPによって異なります：
<ul>
<li><strong>Full QC</strong>：全ての数値・表示を検証（CSRの主要テーブル）</li>
<li><strong>Partial QC</strong>：主要な数値のみ検証（付録テーブル）</li>
<li><strong>Spot Check</strong>：サンプリングによる抜き取り検証（Listing）</li>
</ul>
</div>

<h2>比較方法</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* Production出力とQC出力の比較 */
/* Step 1: 両方のデータセットを同じ構造に揃える */
proc sort data=prod.final out=prod_sorted;
  by paramcd trt01pn;
run;

proc sort data=qc.final out=qc_sorted;
  by paramcd trt01pn;
run;

/* Step 2: PROC COMPAREで比較 */
proc compare base=prod_sorted compare=qc_sorted
    criterion=1e-10 method=absolute
    out=diff outnoequal noprint;
  id paramcd trt01pn;
run;

/* Step 3: 不一致レコードの確認 */
%let diffs = &sysinfo.;
%if &diffs. ne 0 %then %do;
  %put WARNING: Differences found between PROD and QC.;
  proc print data=diff; run;
%end;
%else %do;
  %put NOTE: PROD and QC outputs match perfectly.;
%end;</code></pre>
</div>

<h2>QCワークフロー</h2>
<ol>
<li><strong>仕様確認</strong>：SAP・TLFシェル・ADaM仕様書を確認</li>
<li><strong>QCプログラム作成</strong>：独立してプログラムを作成</li>
<li><strong>比較実行</strong>：PROC COMPAREまたは同等の方法で結果を比較</li>
<li><strong>不一致調査</strong>：差異がある場合、原因を特定（仕様の解釈違い or バグ）</li>
<li><strong>解決・文書化</strong>：不一致の原因と解決策を記録</li>
<li><strong>最終確認</strong>：修正後に再比較し、完全一致を確認</li>
</ol>

<div class="info-box warning">
<div class="info-box-title">⚠️ よくある不一致の原因</div>
<ul>
<li>SAPの解釈の違い（特に欠測値の扱い）</li>
<li>ソート順の違い（同順位の場合の並び方）</li>
<li>四捨五入のタイミングの違い</li>
<li>対象集団の条件の違い（フラグの適用漏れ）</li>
<li>部分日付の処理ルールの違い</li>
</ul>
</div>

<div class="info-box danger">
<div class="info-box-title">🚫 やってはいけないこと</div>
<ul>
<li>Productionプログラムをコピーして修正する（独立性の喪失）</li>
<li>不一致を無視して完了とする</li>
<li>比較前にProductionのコードを確認する</li>
<li>QC結果の文書化を省略する</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1201_1", type: "choice", question: "二重プログラミングでQCプログラマーに最も重要な原則はどれですか？", options: ["Productionプログラムの効率的な再利用", "独立してプログラムを作成すること", "Productionプログラマーと常に連携すること", "最速でQCを完了すること"], answer: 1, explanation: "二重プログラミングの最重要原則は独立性です。QCプログラマーはProductionプログラムを見ずに、SAPとTLFシェルのみに基づいて独立したプログラムを作成します。" },
                { id: "q1201_2", type: "choice", question: "二重プログラミングで両プログラマーが共通して参照する仕様書はどれですか？", options: ["Productionプログラムのコード", "SAP（Statistical Analysis Plan）", "QCプログラマーのメモ", "前回試験のプログラム"], answer: 1, explanation: "SAP（Statistical Analysis Plan）はTLFの仕様を定義する文書であり、ProductionとQC両方のプログラマーが同じSAPを参照して作業します。" },
                { id: "q1201_3", type: "choice", question: "CSRの主要テーブルに対して通常実施されるQCレベルはどれですか？", options: ["Spot Check", "Partial QC", "Full QC", "Review Only"], answer: 2, explanation: "CSR（Clinical Study Report）の主要テーブルには、全ての数値と表示を検証するFull QCが適用されます。" },
                { id: "q1201_4", type: "choice", question: "QC比較で不一致が見つかった場合、最初に行うべきことは何ですか？", options: ["Productionの値に合わせてQCを修正する", "不一致の原因を調査する", "QCの値でProductionを上書きする", "リードプログラマーに報告だけする"], answer: 1, explanation: "不一致が見つかった場合は、まず原因を調査します。SAPの解釈違い、データ処理ロジックのバグなど、根本原因を特定した上で正しい値を決定します。" },
                { id: "q1201_5", type: "fill", question: "二重プログラミングは英語で Double ___ と呼ばれます。", answer: "Programming", explanation: "Double Programming（二重プログラミング）は、Independent Programming とも呼ばれ、二人のプログラマーが独立して同じTLFを作成し比較検証する手法です。" }
            ]
        },
        {
            id: 1202,
            title: "PROC COMPAREによる検証",
            duration: "30分",
            content: `
<h2>PROC COMPAREの概要</h2>
<p><strong>PROC COMPARE</strong>は、2つのSASデータセットを比較するための標準プロシジャです。臨床試験プログラミングでは、ProductionデータとQCデータの一致確認に不可欠なツールです。</p>

<h2>基本構文</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">proc compare base=prod.demographics
             compare=qc.demographics
             listall
             criterion=1e-10
             method=absolute;
  id usubjid;
run;</code></pre>
</div>

<h2>主要オプション</h2>
<table>
<thead>
<tr><th>オプション</th><th>説明</th><th>推奨設定</th></tr>
</thead>
<tbody>
<tr><td><strong>CRITERION=</strong></td><td>数値比較の許容誤差</td><td>1E-10（高精度）</td></tr>
<tr><td><strong>METHOD=</strong></td><td>比較方法</td><td>ABSOLUTE（絶対差）</td></tr>
<tr><td><strong>LISTALL</strong></td><td>全ての不一致を表示</td><td>指定推奨</td></tr>
<tr><td><strong>LISTVAR</strong></td><td>不一致変数のリスト</td><td>必要に応じて</td></tr>
<tr><td><strong>TRANSPOSE</strong></td><td>縦表示形式</td><td>差分の読みやすさ向上</td></tr>
<tr><td><strong>OUT=</strong></td><td>不一致レコードの出力</td><td>不一致調査用に指定</td></tr>
<tr><td><strong>OUTNOEQUAL</strong></td><td>一致レコードを出力しない</td><td>OUTと併用</td></tr>
</tbody>
</table>

<h2>数値精度の問題</h2>
<p>浮動小数点演算の性質上、同じ計算でもプログラムの書き方によって微小な差異が発生することがあります。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 浮動小数点の丸め誤差の例 */
data _null_;
  x = 0.1 + 0.2;
  if x = 0.3 then put "Equal";
  else put "Not equal: " x=best32.;
  /* 結果: Not equal: x=0.30000000000000004 */

  /* 安全な比較方法 */
  if abs(x - 0.3) < 1e-10 then put "Practically equal";
run;

/* PROC COMPAREでの対応 */
proc compare base=prod compare=qc
    criterion=1e-10   /* 1E-10未満の差は無視 */
    method=absolute;  /* 絶対差で比較 */
  id usubjid paramcd;
run;</code></pre>
</div>

<h2>文字変数の比較</h2>
<p>文字変数の比較では、以下の点に注意が必要です。</p>

<table>
<thead>
<tr><th>問題</th><th>原因</th><th>対策</th></tr>
</thead>
<tbody>
<tr><td>長さの違い</td><td>LENGTH文の指定差異</td><td>事前にLENGTH統一</td></tr>
<tr><td>後続空白</td><td>変数長に起因</td><td>TRIMMED比較</td></tr>
<tr><td>大文字/小文字</td><td>UPCASE/LOWCASE未統一</td><td>比較前にUPCASE</td></tr>
<tr><td>全角/半角</td><td>日本語データ特有</td><td>KPROPCASE等で統一</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 文字変数の前処理 */
data prod_clean;
  set prod.final;
  array chars _character_;
  do over chars;
    chars = strip(upcase(chars));  /* 前後空白除去 + 大文字統一 */
  end;
run;

/* 変数長の統一 */
proc sql;
  select name, type, length
  from dictionary.columns
  where libname='PROD' and memname='FINAL'
  order by name;
quit;</code></pre>
</div>

<h2>SYSINFOマクロ変数による自動判定</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">proc compare base=prod compare=qc noprint;
  id usubjid;
run;

/* SYSINFO のビットフラグ */
%let rc = &sysinfo.;

%macro check_compare(rc);
  %if &rc. = 0 %then
    %put NOTE: ✓ Datasets are identical.;
  %else %do;
    %if %sysfunc(band(&rc., 1)) %then
      %put WARNING: Dataset labels differ.;
    %if %sysfunc(band(&rc., 2)) %then
      %put WARNING: Dataset types differ.;
    %if %sysfunc(band(&rc., 8)) %then
      %put WARNING: Variable labels differ.;
    %if %sysfunc(band(&rc., 16)) %then
      %put WARNING: Base has observations not in compare.;
    %if %sysfunc(band(&rc., 32)) %then
      %put WARNING: Compare has observations not in base.;
    %if %sysfunc(band(&rc., 64)) %then
      %put WARNING: Base has BY group not in compare.;
    %if %sysfunc(band(&rc., 128)) %then
      %put WARNING: Compare has BY group not in base.;
    %if %sysfunc(band(&rc., 256)) %then
      %put WARNING: Variable has different types.;
    %if %sysfunc(band(&rc., 512)) %then
      %put WARNING: Base has variable not in compare.;
    %if %sysfunc(band(&rc., 1024)) %then
      %put WARNING: Compare has variable not in base.;
    %if %sysfunc(band(&rc., 2048)) %then
      %put ERROR: Value comparison was unequal.;
    %if %sysfunc(band(&rc., 4096)) %then
      %put WARNING: Conflicting variable types.;
  %end;
%mend;

%check_compare(&rc.);</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 不一致の調査手順</div>
<ol>
<li>PROC COMPAREの出力から不一致変数・レコードを特定</li>
<li>OUT=データセットで具体的な差分値を確認</li>
<li>該当レコードをADaMデータセットまで遡って追跡</li>
<li>Production/QCそれぞれのプログラムロジックを確認</li>
<li>SAPの仕様との整合性を検証</li>
</ol>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ CRITERION値の設定</div>
CRITERION値は厳しすぎても緩すぎても問題があります：
<ul>
<li><strong>1E-10</strong>：推奨。浮動小数点の丸め誤差を許容しつつ、実質的な差異を検出</li>
<li><strong>1E-5</strong>：緩すぎる可能性。表示上の差異を見逃す恐れ</li>
<li><strong>0</strong>（完全一致）：浮動小数点演算では非現実的</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1202_1", type: "choice", question: "PROC COMPAREで推奨される数値比較の許容誤差（CRITERION）は通常どれですか？", options: ["1E-5", "1E-8", "1E-10", "0（完全一致）"], answer: 2, explanation: "1E-10が推奨されます。浮動小数点の丸め誤差を許容しつつ、実質的な差異（表示に影響する差）を確実に検出できます。" },
                { id: "q1202_2", type: "choice", question: "PROC COMPAREの比較結果を格納するSAS自動マクロ変数はどれですか？", options: ["&SYSCC", "&SYSINFO", "&SYSERR", "&SYSRC"], answer: 1, explanation: "&SYSINFO マクロ変数にはPROC COMPAREの結果がビットフラグとして格納され、どのタイプの差異があったかを判定できます。" },
                { id: "q1202_3", type: "choice", question: "PROC COMPAREで不一致レコードのみを出力データセットに書き出すオプションはどれですか？", options: ["OUTDIFF", "OUTNOEQUAL", "ONLYDIFF", "NOMATCH"], answer: 1, explanation: "OUTNOEQUALオプションをOUT=と併用すると、一致レコードを除外し不一致レコードのみが出力データセットに書き出されます。" },
                { id: "q1202_4", type: "choice", question: "文字変数の比較で「後続空白」の問題が発生する主な原因はどれですか？", options: ["エンコーディングの違い", "LENGTH文の指定差異", "ソート順の違い", "ラベルの違い"], answer: 1, explanation: "文字変数の長さ（LENGTH）の違いにより、短い方に後続空白が付加され、見た目は同じでも不一致として検出されることがあります。" },
                { id: "q1202_5", type: "fill", question: "PROC COMPAREで比較キーとなるレコード識別変数を指定するステートメントは ___ 文です。", answer: "ID", explanation: "ID文でレコードの識別変数（USUBJID等）を指定します。これにより、同じIDのレコード同士が対応付けられて比較されます。" }
            ]
        },
        {
            id: 1203,
            title: "ログレビューとデバッグ",
            duration: "25分",
            content: `
<h2>SASログレビューの重要性</h2>
<p>臨床試験プログラミングでは、<strong>SASログのクリーン化</strong>が品質保証の基本要件です。多くの企業のSOPでは、全てのWARNING・ERROR・不要なNOTEをログから除去することが求められます。</p>

<h2>ERROR、WARNING、NOTEの分類</h2>
<table>
<thead>
<tr><th>レベル</th><th>重要度</th><th>対応</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>ERROR</strong></td><td>最高</td><td>必ず解決</td><td>構文エラー、ファイル不在</td></tr>
<tr><td><strong>WARNING</strong></td><td>高</td><td>原因調査・解決</td><td>型変換、結合の不一致</td></tr>
<tr><td><strong>NOTE（要対応）</strong></td><td>中</td><td>調査・修正</td><td>初期化されていない変数、型変換</td></tr>
<tr><td><strong>NOTE（許容）</strong></td><td>低</td><td>確認のみ</td><td>レコード数、処理時間</td></tr>
</tbody>
</table>

<h2>要注意NOTEメッセージ</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS Log</span>
</div>
<pre><code class="language-sas">/* 1. 初期化されていない変数 */
NOTE: Variable newvar is uninitialized.
/* 原因: RETAIN忘れ、変数名のタイプミス */
/* 対策: 変数名を確認、RETAINまたはLENGTH文で事前定義 */

/* 2. 自動型変換（数値→文字、文字→数値） */
NOTE: Numeric values have been converted to character values
      at the places given by: (Line):(Column).
NOTE: Character values have been converted to numeric values
      at the places given by: (Line):(Column).
/* 原因: INPUT/PUT関数の未使用、MERGEでの型不一致 */
/* 対策: 明示的にINPUT()/PUT()で変換 */

/* 3. MERGE文の注意 */
NOTE: MERGE statement has more than one data set with repeats
      of BY values.
/* 原因: 多対多のMERGE */
/* 対策: MERGEする前にデータの粒度を確認、重複を除去 */

/* 4. 未使用マクロ変数 */
WARNING: Apparent symbolic reference VARNAME not resolved.
/* 原因: マクロ変数名のタイプミス、スコープ問題 */
/* 対策: %PUT &変数名. で値を確認 */</code></pre>
</div>

<h2>デバッグテクニック</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* 1. データステップのデバッグ */
data test;
  set adsl;
  put _n_= usubjid= age= sex=;  /* PUT文で値を確認 */
  if _n_ <= 10;  /* 最初の10レコードのみ処理 */
run;

/* 2. マクロのデバッグオプション */
options mprint;    /* 展開後のSASコードを表示 */
options mlogic;    /* マクロ実行の論理フロー */
options symbolgen; /* マクロ変数の解決値 */

/* 3. SQL デバッグ */
proc sql;
  /* _method オプションで実行計画を表示 */
  select * from adae
  where usubjid = 'ABC-001-001';
quit;

/* 4. 中間データセットの確認 */
proc freq data=_temp_;
  tables var1 * var2 / missing;
run;</code></pre>
</div>

<h2>自動ログチェックプログラム</h2>
<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">%macro check_log(logfile=, outds=log_issues);
  data &outds.;
    length line $500 type $10 issue $200;
    infile "&logfile." truncover;
    input line $char500.;

    lineno = _n_;

    if index(upcase(line), 'ERROR') = 1 then do;
      type = 'ERROR';
      issue = line;
      output;
    end;
    else if index(upcase(line), 'WARNING') = 1 then do;
      type = 'WARNING';
      issue = line;
      output;
    end;
    else if index(upcase(line), 'NOTE: VARIABLE') and
            index(upcase(line), 'UNINITIALIZED') then do;
      type = 'NOTE';
      issue = line;
      output;
    end;
    else if index(upcase(line), 'NOTE: CHARACTER VALUES HAVE BEEN CONVERTED') or
            index(upcase(line), 'NOTE: NUMERIC VALUES HAVE BEEN CONVERTED') then do;
      type = 'NOTE';
      issue = line;
      output;
    end;
    else if index(upcase(line), 'MORE THAN ONE DATA SET WITH REPEATS') then do;
      type = 'NOTE';
      issue = line;
      output;
    end;
  run;

  proc print data=&outds. noobs;
    var lineno type issue;
    title "Log Review Results: &logfile.";
  run;
%mend check_log;</code></pre>
</div>

<div class="info-box tip">
<div class="info-box-title">💡 ログレビューのベストプラクティス</div>
<ul>
<li>プログラム完了後に必ずログ全体を確認する</li>
<li>自動ログチェックマクロを活用して効率化する</li>
<li>許容されるNOTE（例: レコード数の表示）のリストを作成しておく</li>
<li>ログファイルをバージョン管理し、レビュー記録を残す</li>
</ul>
</div>

<h2>メモリとパフォーマンスの問題</h2>
<table>
<thead>
<tr><th>症状</th><th>原因</th><th>対策</th></tr>
</thead>
<tbody>
<tr><td>メモリ不足エラー</td><td>大規模データのソート</td><td>TAGSORT、MEMSIZE増加</td></tr>
<tr><td>処理時間の長時間化</td><td>非効率なMERGE/JOIN</td><td>インデックス活用、SQL最適化</td></tr>
<tr><td>ディスク容量不足</td><td>中間データセットの蓄積</td><td>WORK領域の定期削除</td></tr>
<tr><td>無限ループ</td><td>DOループ/マクロの条件ミス</td><td>ループカウンタ確認</td></tr>
</tbody>
</table>

<div class="info-box warning">
<div class="info-box-title">⚠️ ログレビューの落とし穴</div>
<ul>
<li>「0 observations」のNOTEは、条件ミスでデータが空になっている可能性がある</li>
<li>WARNINGが発生していても処理が完了する場合があるが、出力の正確性は保証されない</li>
<li>ログが長い場合、重要なメッセージが埋もれやすいので自動チェックを活用する</li>
</ul>
</div>
`,
            quiz: [
                { id: "q1203_1", type: "choice", question: "SASログで「Variable newvar is uninitialized」というNOTEが出る主な原因はどれですか？", options: ["メモリ不足", "変数名のタイプミスまたはRETAIN忘れ", "データセットが空", "ソート順の問題"], answer: 1, explanation: "このNOTEは、参照している変数が定義されていないことを示します。変数名のタイプミスや、RETAIN/LENGTH文での事前定義の忘れが主な原因です。" },
                { id: "q1203_2", type: "choice", question: "MERGE文で「more than one data set with repeats of BY values」が発生するのはどのような場合ですか？", options: ["BY変数が指定されていない", "多対多（many-to-many）のMERGE", "データセットが空", "ソートされていない"], answer: 1, explanation: "このNOTEは、MERGE対象の両方のデータセットでBY変数の値が重複している（多対多の関係）場合に発生します。意図しない結果になる可能性があるため調査が必要です。" },
                { id: "q1203_3", type: "choice", question: "SASマクロのデバッグで、展開後のSASコードをログに表示するオプションはどれですか？", options: ["SYMBOLGEN", "MLOGIC", "MPRINT", "MACROGEN"], answer: 2, explanation: "MPRINTオプションは、マクロが展開された後の実際のSASコードをログに表示します。SYMBOLGENはマクロ変数の解決値、MLOGICはマクロ実行の論理フローを表示します。" },
                { id: "q1203_4", type: "choice", question: "臨床試験プログラミングのSOPでログに求められる状態はどれですか？", options: ["ERRORのみ解消", "ERRORとWARNINGを解消", "ERROR、WARNING、不要なNOTEを全て除去（クリーンログ）", "ログの確認は不要"], answer: 2, explanation: "多くの企業のSOPでは、全てのERROR・WARNING・不要なNOTEを除去した「クリーンログ」が求められます。許容されるNOTEは企業のSOPで定義されます。" },
                { id: "q1203_5", type: "fill", question: "SASログで自動型変換（暗黙の型変換）が発生した場合、明示的に変換するために使用する関数は数値→文字が PUT()、文字→数値が ___() です。", answer: "INPUT", explanation: "INPUT()関数は文字値を数値に変換します。PUT()関数は数値を文字に変換します。暗黙の型変換を避けるため、これらの関数で明示的に変換することが推奨されます。" }
            ]
        },
        {
            id: 1204,
            title: "コードレビューとSOP",
            duration: "25分",
            content: `
<h2>コードレビューの目的</h2>
<p>コードレビューは、TLFプログラムの品質・正確性・保守性を確保するための重要なプロセスです。二重プログラミングとは異なり、コードの設計・実装・可読性にフォーカスします。</p>

<h2>コードレビューチェックリスト</h2>
<table>
<thead>
<tr><th>カテゴリ</th><th>チェック項目</th><th>重要度</th></tr>
</thead>
<tbody>
<tr><td><strong>正確性</strong></td><td>SAPの仕様通りに実装されているか</td><td>高</td></tr>
<tr><td><strong>正確性</strong></td><td>対象集団のフラグが正しく適用されているか</td><td>高</td></tr>
<tr><td><strong>正確性</strong></td><td>欠測値の処理が仕様通りか</td><td>高</td></tr>
<tr><td><strong>効率性</strong></td><td>不要なソートやMERGEがないか</td><td>中</td></tr>
<tr><td><strong>保守性</strong></td><td>ハードコーディングが避けられているか</td><td>中</td></tr>
<tr><td><strong>保守性</strong></td><td>コメントが適切に記載されているか</td><td>中</td></tr>
<tr><td><strong>ログ</strong></td><td>ログがクリーンか</td><td>高</td></tr>
<tr><td><strong>出力</strong></td><td>TLFシェルと出力が一致するか</td><td>高</td></tr>
</tbody>
</table>

<h2>コーディング規約</h2>
<p>臨床試験プログラミングでは、チーム内で統一されたコーディング規約が重要です。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/*============================================================*
 * Program: t_14_1_1.sas
 * Purpose: Table 14.1.1 - Summary of Demographics
 * Input:   adsl
 * Output:  T_14_1_1.rtf
 * Author:  J. Smith
 * Date:    2024-06-15
 * Modifications:
 *   2024-07-01 K. Tanaka - Updated per SAP amendment 2
 *============================================================*/

/* プログラムヘッダーの標準テンプレート */

/* 1. セットアップ */
%include "setup.sas";
%tlf_header(protocol=ABC-001, output=T_14_1_1,
            title=Summary of Demographics);

/* 2. データ取得・加工 */
data work.adsl_sub;
  set adam.adsl;
  where saffl = 'Y';  /* Safety Population */
run;

/* 3. 統計計算 */
/* ... */

/* 4. 表出力 */
/* ... */

/* 5. クリーンアップ */
%tlf_footer(source=adsl, pgm=t_14_1_1);
ods rtf close;</code></pre>
</div>

<h2>SOP（Standard Operating Procedure）</h2>
<p>臨床試験プログラミングのSOPは、一貫した品質を確保するための標準手順書です。</p>

<table>
<thead>
<tr><th>SOPカテゴリ</th><th>内容</th><th>例</th></tr>
</thead>
<tbody>
<tr><td><strong>プログラミングSOP</strong></td><td>コーディング規約、命名規則</td><td>変数名はUPCASE、マクロ名は%で始まる</td></tr>
<tr><td><strong>QC SOP</strong></td><td>QCの範囲、方法、記録</td><td>Full QCはCSR Table、Spot CheckはListing</td></tr>
<tr><td><strong>ディレクトリSOP</strong></td><td>ファイル配置、命名規則</td><td>pgm/prod/, pgm/qc/, output/</td></tr>
<tr><td><strong>出力SOP</strong></td><td>RTF/PDFのスタイル規定</td><td>フォント、余白、ページ設定</td></tr>
<tr><td><strong>転送SOP</strong></td><td>成果物の転送・提出手順</td><td>DMへの転送、eCTDパッケージング</td></tr>
</tbody>
</table>

<h2>トレーサビリティ</h2>
<p>規制当局はデータの<strong>トレーサビリティ（追跡可能性）</strong>を重視します。TLFの各数値が、どのADaMデータセットのどの変数から導出されたかを明確にする必要があります。</p>

<div class="code-block">
<div class="code-block-header">
<span class="code-lang">SAS</span>
</div>
<pre><code class="language-sas">/* トレーサビリティの例 */

/* TLF出力: Table 14.1.1 - Summary of Demographics */
/*   ↑ SAP Section 10.1 に定義 */
/*   ↑ ADaM: adsl.AGE, adsl.SEX, adsl.RACE */
/*   ↑ SDTM: dm.AGE, dm.SEX, dm.RACE */
/*   ↑ CRF: Demographics Form */

/* プログラム内コメントでデータソースを明記 */
data summary;
  set adam.adsl;  /* Source: ADaM ADSL */
  where ittfl = 'Y';  /* ITT Population per SAP 9.1 */

  /* Age categories per SAP Section 10.1.1 */
  if age < 65 then agegr = '<65';
  else agegr = '>=65';
run;</code></pre>
</div>

<h2>変更管理</h2>
<ol>
<li><strong>SAP改訂</strong>：SAPが改訂された場合、影響を受けるTLFプログラムを特定</li>
<li><strong>プログラム修正</strong>：修正箇所をコメントに記録（日付、修正者、理由）</li>
<li><strong>再QC</strong>：修正されたTLFに対してQCを再実施</li>
<li><strong>バージョン管理</strong>：Gitやバージョン管理システムで変更履歴を管理</li>
</ol>

<div class="info-box tip">
<div class="info-box-title">💡 効果的なコードレビューのコツ</div>
<ul>
<li>レビュー前にSAPとTLFシェルを確認する</li>
<li>最初にログを確認し、クリーンであることを確認する</li>
<li>データの流れ（入力→加工→出力）に沿ってレビューする</li>
<li>数値は実際のADaMデータセットと突合する</li>
<li>指摘はコードの問題点と改善案の両方を提示する</li>
</ul>
</div>

<div class="info-box warning">
<div class="info-box-title">⚠️ ハードコーディングの危険性</div>
以下のようなハードコーディングは避けるべきです：
<ul>
<li>被験者数の直接指定（例: <code>n = 150;</code>）→ Big Nマクロを使用</li>
<li>日付のハードコーディング → マクロ変数で管理</li>
<li>投与群名の直接記述 → データから動的に取得</li>
<li>ファイルパスの直接指定 → %INCLUDEやマクロ変数で管理</li>
</ul>
ハードコーディングはデータ更新時のエラーの温床になります。
</div>
`,
            quiz: [
                { id: "q1204_1", type: "choice", question: "コードレビューでチェックすべき最も重要な項目はどれですか？", options: ["プログラムの実行速度", "SAPの仕様通りに実装されているか", "コメントの量", "変数名の長さ"], answer: 1, explanation: "コードレビューで最も重要なのは、SAP（Statistical Analysis Plan）の仕様通りに正確に実装されているかの確認です。正確性が全てに優先します。" },
                { id: "q1204_2", type: "choice", question: "TLFプログラムでハードコーディングを避けるべき理由はどれですか？", options: ["コードが長くなるから", "実行速度が遅くなるから", "データ更新時にエラーの原因になるから", "コンパイルエラーが発生するから"], answer: 2, explanation: "ハードコーディング（例: 被験者数を直接記述）すると、データベースロックやSAP改訂によるデータ変更時に値が不整合になり、誤ったTLFが出力されるリスクがあります。" },
                { id: "q1204_3", type: "choice", question: "臨床試験プログラミングにおけるトレーサビリティとは何ですか？", options: ["プログラムの実行時間の記録", "TLFの数値からデータソースまで遡れること", "プログラマーの作業時間の追跡", "サーバーのアクセスログ"], answer: 1, explanation: "トレーサビリティとは、TLFに表示された各数値が、ADaM→SDTM→CRFのどのデータから導出されたかを追跡できることです。規制当局はこの追跡可能性を重視します。" },
                { id: "q1204_4", type: "choice", question: "SAPが改訂された場合、プログラマーが最初に行うべきことはどれですか？", options: ["全てのプログラムを再実行する", "影響を受けるTLFプログラムを特定する", "QCを全て最初からやり直す", "前のバージョンのSAPを削除する"], answer: 1, explanation: "SAP改訂時はまず影響を受けるTLFを特定し（Impact Analysis）、該当するプログラムのみを修正してQCを再実施します。" },
                { id: "q1204_5", type: "fill", question: "臨床試験プログラミングの標準手順書を英語の略称で ___ と呼びます。", answer: "SOP", explanation: "SOP（Standard Operating Procedure）は標準作業手順書であり、プログラミング・QC・出力・転送など各プロセスの手順を文書化したものです。" }
            ]
        }
    ]
};
