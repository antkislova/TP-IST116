using System;

namespace AdvAgency.Helpers
{
    //необходмо для обработки пользовательских исключений приложения
    public class AppException : Exception
    {
        public AppException() { }
        public AppException(String message) : base(message) {

        }
    }
}