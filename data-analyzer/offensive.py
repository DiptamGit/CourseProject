from profanity_check import predict, predict_prob

predict(['predict() takes an array and returns a 1 for each string if it is offensive, else 0.'])
# [0]

print(predict(['I love you']))
# [1]

predict_prob(['predict_prob() takes an array and returns the probability each string is offensive'])
# [0.08686173]

print(predict_prob(['Motherfucker']))
# [0.7618861]