


## Some Background

I have been using ubuntu for about a month. The developer experience is great. It, however, falls short whenever it comes to common office use cases. So I thought, "why not get the best of the two world?" I then decided to opt for a dual boot to get the best of both. Thus, it was time to install windows.

### Installing windows

After downloading an iso copy of windows 10, it was time to burn it to my flash drive. I connected my 125 Gb flash drive to my laptop, opened the disk app, and proceeded to format my 15 Gb storage drive to fat32. No, you did not misread. It turned out I had just formatted my SSD partition which contained all the EFI files. I noticed my mistake, but everything still worked fine. I restarted my laptop to install windows which failed for some reason.

### Falling back to ubuntu

I thought well let's boot on ubuntu and debug the issue. Well, ubuntu did not boot either and my laptop gave me a blank blue screen. I, at first, did not know what was the issue. I then thought, aren't EFI files required for an os to boot? As you may have guessed that was the reason.
![boy that feels like he messed up](https://res.cloudinary.com/dkoatnxem/image/upload/v1647570000/ben-white-qDY9ahp0Mto-unsplash_lkfvrj.jpg)
I freaked out. As a Linux "noob" I had no idea of what to do and started wandering from forum to forum. I eventually found out about boot repair and of a way to get by EFI partition back onto my SSD.
I am writing this article from my fully functional ubuntu machine.

## Why am I glad?

Though it was not particularly pleasing to see my laptop not booting while I had assignments to submit, I learned a bit more about operating systems, boot-loaders, and EFI files. I by no means became a master, but I am glad I am a little more knowledgeable.
With time I have started to **value** all the smalls bugs that I have faced using ubuntu. I am glad that I am learning little by little. If anything, I have learned to value my failures and mistakes as much as successes.
