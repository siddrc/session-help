# Use of Redis as a Session Store

Note to Nabin.

1. I am assuming you have installed Redis in your system, and it should be running as a service at the default port.
2. I have created SessionStore class, which basically talks to Redis
3. If you see above I am using userSessionId to identify each client, see the thing is we have one server but many clients, how do we store all clients data with same key, without over-ridding someone elses session data.
Answer: We identify each user at successfull login -`userSessionId` and send userSessionId back in response.

4.The client must store this userSessionId in localStorage (readily available browser object-Google it).
And after login in each request, the client must provide userSessionId so that we can use it to fetch the correct data from Redis.

5. Imagine a bank cashier, and you with a token, how does the cashier know against what check and what amount did you get your token on.Obviously there must have been some internal checks done and notifications done when you submitted the check. This is somewhat similar.


Please note:
1. You need to read Clean Code by Robert C.Martin, Head First Design Patterns, Effective Java by Joshua Blosch, Data Structures and Algorithms by Robert Lafore

FUNCTIONS MUST ALWAYS BE SMALL, OR ELSE YOU CANNOT RE-USE THEM.

2. You need to start thinking about reusability of code.
3. You need to learn the use of async and await 
4. If you don't do the above three, you cannot become a NINJA ;)
5. Take a ES6 course by Wes Boss, trust me no one uses var now, it is outdated.
   I have videos of Wes Boss send me your email id and I can share the vidoes with you.
   
   Please read on Redis.
   Also, please note Redis has a limited memory, read on it.You cannot just keep dumping to redis, because Redis stores in RAM and not to Hard-disk. Clear redis once the user logs out, or you can set keys in Redis that expire on its own, ofcourse you need to mention some time period like a 3 hours or 1 day etc.

   And please learn to commit man, always commit package.json and package-lock.json
   NEVER EVER COMMIT node_modules.
