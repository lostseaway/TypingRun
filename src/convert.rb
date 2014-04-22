out = []
while true
	a = gets.chomp
	if a == "123456"
		puts "END"
		break
	end
	out << a
end
p out.select{|x| x.length>=8}