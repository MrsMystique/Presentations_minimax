$file = "C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"
$content = Get-Content $file -Encoding UTF8 -Raw

$old = @'
Где **геометрически** возникает $\sqrt{6} = \sqrt{2} \cdot \sqrt{3}$ — это в задачах, где в одной конструкции **соединяются** равносторонний Δ (√3) и квадрат (√2). Например, в **Секции 16.3 (двугранный угол в кубе)**: высота равностороннего Δ со стороной $\sqrt{2}$ (диагональ грани куба) равна $\dfrac{\sqrt{2} \cdot \sqrt{3}}{2} = \dfrac{\sqrt{6}}{2}$. Это и есть **настоящая** планометрическая конструкция корня $\sqrt{6}$.
'@

$new = @'
Где **геометрически** возникает $\sqrt{6} = \sqrt{2} \cdot \sqrt{3}$ — это в задачах, где в одной конструкции **соединяются** равносторонний Δ (√3) и квадрат (√2). Например, **в кубе** $ABCDA_1B_1C_1D_1$ с ребром $a$: возьмём точки $B$, $D$ (вершины одной грани-основания) и $C_1$ (вершина противоположной грани). Это **Δ $BDC_1$**:
- $BD$ — диагональ основания $= a\sqrt{2}$.
- $BC_1$ — диагональ грани $BCC_1B_1 = a\sqrt{2}$.
- $DC_1$ — диагональ грани $DCC_1D_1 = a\sqrt{2}$.

Все три стороны равны $a\sqrt{2}$ — Δ $BDC_1$ **равносторонний**. Его высота $h_{\Delta} = \dfrac{a\sqrt{2} \cdot \sqrt{3}}{2} = \dfrac{a\sqrt{6}}{2}$. Здесь $\sqrt{2}$ приходит из диагонали квадрата, а $\sqrt{3}$ — из высоты равностороннего Δ. **Это и есть настоящая планометрическая конструкция корня $\sqrt{6}$ в стереометрии.**
'@

if ($content.Contains($old)) {
    Write-Host "Old text FOUND, replacing..."
    $newContent = $content.Replace($old, $new)
    [System.IO.File]::WriteAllText($file, $newContent, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Done. New file length:" (Get-Item $file).Length
} else {
    Write-Host "Old text NOT found. Showing first 100 chars of file:"
    Write-Host $content.Substring(0, 100)
}
