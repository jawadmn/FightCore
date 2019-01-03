﻿using FightCore.Models;
using FightCore.Repositories;
using FightCore.Services.Patterns;

namespace FightCore.Services
{
	public interface IUserService : IEntityService<ApplicationUser>
	{
	}

	public class UserService : EntityService<ApplicationUser>, IUserService
	{
		private readonly IUserRepository _repository;

	    /// <inheritdoc />
	    public UserService(IUserRepository repository) : base(repository)
		{
			_repository = repository;
		}
	}
}