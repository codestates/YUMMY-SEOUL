import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Req,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { request, response, Response } from 'express';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../middleware/multeroption';
import { createReadStream } from 'graceful-fs';
import { join } from 'path';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response) {
    const accesstoken = await this.userService.login(req.body);
    const refreshtoken = await this.userService.refreshtoken(req.body);
    response.cookie('jwt', accesstoken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    response.cookie('jwt1', refreshtoken, {
      data: accesstoken,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    response.json({ message: 'login successfully' });
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async signup(@Request() req, @Res() response, @UploadedFile() file: File[]) {
    if (req.file === undefined) {
      // this.userService.sign_image(req.body, 'default image'); //이미지 없으면 default image 삽입
      const data = await this.userService.signup(req.body, 'default.png');
      if (data) {
        response.status(201).json({ message: 'sign up successfully' });
      } else {
        response.status(409).json({ message: 'email exists' });
      }
    }
    if (req.file !== undefined) {
      const uploadedFiles: string[] = this.userService.uploadFiles(file);
      console.log(req.file.path)
      const data = await this.userService.signup(req.body, req.file.filename);
      if (data) {
        response.status(201).json({ message: 'sign up successfully' });
      } else {
        response.status(409).json({ message: 'email exists' });
      }
    }
  }

  @Post('signout')
  async signout(@Res() response) {
    response
      .status(205)
      .clearCookie('jwt')
      .json({ message: 'sign out successfully' });
  }

  @Get('userinfo/userimage')
  async getimage(@Request() req, @Res() response) {
    const userdata = await this.userService.userinfo(req.user);
    response.json({
      data: userdata.user_img,
      message: 'get user image succesfully',
    });
  }

  @Get('userinfo/userdata')
  async getprofile(@Request() req, @Res() response) {
    const userdata = await this.userService.userinfo(req.user);
    
    delete userdata.password;
    response.json({
      data: userdata,
      message: 'get user info successfully',
    });
  }

  @Patch('change-password')
  async change_password(@Request() req, @Res() response) {
    const boolean = await this.userService.changepassword(req.body, req.user);
    if (!boolean) {
      response.status(409).json({ message: 'this password alredy exist' });
    }
    if (boolean) {
      response.status(201).json({ message: 'change password successfully' });
    }
  }

  @Patch('change-username')
  async change_username(@Request() req, @Res() response) {
    const boolean = await this.userService.changeusername(req.body, req.user);
    if (!boolean) {
      response.status(400).json({ message: 'this username already exist' });
    }
    if (boolean) {
      response.status(201).json({ message: 'change username successfully' });
    }
  }

  @Patch('change-image')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async change_image(
    @Request() req,
    @Res() response,
    @UploadedFile() file: File[],
  ) {
    const uploadedFiles: string[] = this.userService.uploadFiles(file);
    const boolean = await this.userService.change_image(
      uploadedFiles[0],
      req.user,
    );
    if (boolean) {
      response
        .status(201)
        .json({ message: 'change profile image successfully' });
    }
    if (!boolean) {
      response.status(401).json({ message: 'Invalid User' });
    }
    if (boolean === 1) {
      response.status(409).json({ message: 'this image is already exist' });
    }
  }

  @Delete('image')
  async delete_image(@Request() req, @Res() response) {
    const boolean = await this.userService.delete_image(req.user);
    if (!boolean) {
      response.status(401).json({ message: 'Invalid User' });
    }
    if (boolean) {
      response.json({ message: 'change profile image successfully' });
    }
  }

  @Post('delete-account')
  async delete_account(@Request() req, @Res() response) {
    const boolean = await this.userService.delete_account(req.body, req.user);
    if (boolean === 1) {
      response.status(401).json({ message: 'Wrong password' });
    }
    if (!boolean) {
      response.status(401).json({ message: 'Invalid user' });
    }
    if (boolean) {
      response.status(201).json({ message: 'delete account seccessfully' });
    }
  }

  @Post('check-username')
  async check_username(@Request() req, @Res() response) {
    const boolean = await this.userService.check_username(req.body);
    if (!boolean) {
      response.json({ message: 'possible to use this username' });
    }
    if (boolean) {
      response.json({ message: 'this username already exist' });
    }
  }

  @Get('google_login')
  async google_login(@Request() req, @Res() response){
    const google = await this.userService.google_login(req.query.code)
    if(!google){
      response.status(404).json({ message: 'email not exixst'})
    }
    if(google){
      const accesstoken = await this.userService.login(google);
      const refreshtoken = await this.userService.refreshtoken(google);
      console.log(google)
      response.cookie('jwt', accesstoken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
      response.cookie('jwt1', refreshtoken, {
        data: accesstoken,
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });


      response.json({ message: 'login successfully'})
    }
      
  }

  @Get('kakao_login')
  async kakao_login(@Request() req, @Res() response){
    const kakao = await this.userService.kakao_login(req.query.code)
      response.json({ message: 'login successfully'})

  }

}
