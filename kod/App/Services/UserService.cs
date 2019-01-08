using System;
using System.Collections.Generic;
using AdvAgency.Models;
using AdvAgency.Helpers;
using AdvAgency.Persistence;
using System.Linq.Expressions;

namespace AdvAgency.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IRepository<User> userRep, IUnitOfWork uof){
            this._userRepo = userRep;
            this._unitOfWork = uof;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _userRepo.Get(u => u.Email == email);

            // check if username exists and password is correct
            if (user == null || !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public User Create(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Необходим пароль");

            if (_userRepo.Get(u => u.Email == user.Email) != null)
                throw new AppException($"Пользователь с электронной почтой {user.Email} уже существует.");
            
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _userRepo.Create(user);
            _unitOfWork.Complete();

            return user;
        }

        public void Delete(int id)
        {
            _userRepo.Delete(new User() { Id = id });
        }

        public IEnumerable<User> Fetch(Expression<Func<User, bool>> predicate)
        {
            return _userRepo.Fetch(predicate);
        }

        public User Get(int id)
        {
            return _userRepo.Get(id);
        }

        public User Get(Func<User, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public void Update(User user, string password = null)
        {
            throw new NotImplementedException();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt){
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

    }
}