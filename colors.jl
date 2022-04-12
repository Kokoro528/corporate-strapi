using Pkg
using Plots
using Colors, ColorSchemes
# function f(x, y)
#     r = sqrt(x^2 + y^2)
#     return cos(r) / (1 + r)
# end
# x = range(0, 2π, length = 30)

# heatmap(x, x, f, c = :thermal)

# using Plots
# x = 1:10; y = rand(10); # These are the plotting data
# plot(x, y)



# cs = new ColorScheme()

# cs = ColorSchemes.devon
 
colors = [trunc.([x.r, x.g, x.b] * 256)  for x in cgrad(ColorSchemes.devon , 12, categorical=true)]  

bar(r, g, b) = string("RGBA(", r, ",", g, ",", b, ")")

open( "./colors.md", "a+") do io
    println(io, "===============")
    i = 9
    for x in colors
        if (i === 0) 
            num = 50
        else
            num = i * 100
        end
        println(io, string(num, ": ") * '"' * bar(x...) * '"' * ',')
        i = i - 1
    end
    # f = open(joinpath(root,file), "r") 
    # print(io, origTxt)
end